#! /bin/bash

source .env
source scripts/shared/vars.sh
source scripts/shared/messages.sh

if ! [ -d "${PWD}/build" ]; then 
  build_doesnt_exist_error
  exit 1;
fi

PROD_THEME_DIR=$REMOTE_PROJECT_DIR/dist
HOST_THEME_BUILD_DIR=build

echo "Creating theme folder if one doesn't exist"
gcloud compute ssh \
  $USER@$VM \
  --zone=$ZONE \
  --command="mkdir -p $PROD_THEME_DIR"

echo "Clearing theme files"
gcloud compute ssh \
  $USER@$VM \
  --zone=$ZONE \
  --command="rm -rf $PROD_THEME_DIR/*"

echo 'Setting file ownerships...'
gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --command "sudo chown -R $USER:$USER $PROD_THEME_DIR"

echo 'Uploading theme files...'
gcloud compute scp \
  --recurse \
  --zone $ZONE \ 
  --compress $HOST_THEME_BUILD_DIR/* \
  $USER@$VM:$PROD_THEME_DIR

# echo 'Reverting permissions'
# gcloud compute ssh \
#   $USER@$VM \
#   --zone $ZONE \
#   --command "sudo chown -R www-data:www-data $PROD_THEME_DIR"