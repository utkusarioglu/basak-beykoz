#! /bin/bash

source scripts/shared/check_env.sh
source .env
source scripts/shared/vars.sh

SQL_BACKUP=20210525-151136.sql
PROD_DB=wordpress

# Removes trailing slash and protocol from url string
function clean_url {
  URL=$1
  # Removes the trailing slash if there is one
  if [ "${URL: -1}" == "/" ]; then
      URL=${URL: 0: $(expr ${#URL} - 1)}
  fi
  # Removes prefixes if there are any
  PREFIXES=("http://" "https://")
  for prefix in ${PREFIXES[@]}; do
      if [ "${URL:0:${#prefix}}" == $prefix ]; then
          URL=${URL:${#prefix}:${#URL}}
      fi
  done
  echo $URL
}

echo "Pushing latest backup..."
gcloud compute scp \
  --compress \
  --zone "$ZONE" \
  --project "$PROJECT" \
  $HOST_BACKUPS_DIR/$SQL_BACKUP \
  $USER@$VM:/tmp/$SQL_BACKUP

echo "Getting root pass..."
# Command used for getting the root pass comes from the link below:
# https://docs.litespeedtech.com/cloud/images/wordpress/#how-to-access-the-installed-software
# ! having root pass leave the prod machine is a bad idea and shall be fixed before production
ROOT_PASS=$(gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --project "$PROJECT" \
  --command \
  "sed -n 1p /home/ubuntu/.db_password | awk -F '\"' '{print(\$2)}'")

#
echo "Restoring sql backup..."
gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --project "$PROJECT" \
  --command \
  "mysql -uroot -p$ROOT_PASS $PROD_DB < /tmp/$SQL_BACKUP"

echo "Clearing backup file..."
gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --project "$PROJECT" \
  --command \
  "rm /tmp/$SQL_BACKUP"

echo "Getting current home url..."
read -r -d '' GET_HOME_QUERY << EOM
  SELECT option_value 
  FROM wp_options 
  WHERE option_name = 'home';
EOM
CURRENT_URL=$(gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --project "$PROJECT" \
  --command \
  "mysql \
    -sN \
    -uroot \
    -p$ROOT_PASS \
    --database=$PROD_DB \
    --execute=\"$GET_HOME_QUERY\"")
# This cleans the protocol and other non `host` components
CURRENT_URL=$(clean_url $CURRENT_URL)

#
echo "Getting public ip..."
NEW_URL=$(gcloud compute instances describe \
  $VM \
  --zone $ZONE \
  --project $PROJECT \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)')

echo "Replacing home url..."
# TODO This section mimics db/replace_home_url script query.
# Having this here doesn't comply with dry principles.
read -r -d '' REPLACE_QUERY << EOM
  START TRANSACTION;

  UPDATE wp_options 
  SET option_value = replace(option_value, '$CURRENT_URL', '$NEW_URL') 
  WHERE option_name = 'home' OR option_name = 'siteurl';

  UPDATE wp_posts 
  SET guid = replace(guid, '$CURRENT_URL','$NEW_URL');

  UPDATE wp_posts 
  SET post_content = replace(post_content, '$CURRENT_URL', '$NEW_URL');

  UPDATE wp_postmeta 
  SET meta_value = replace(meta_value,'$CURRENT_URL','$NEW_URL');

  COMMIT;
EOM
gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --project "$PROJECT" \
  --command \
  "mysql \
    --user=root \
    --password="$ROOT_PASS" \
    --database="$PROD_DB" \
    --execute=\"$REPLACE_QUERY\""


  