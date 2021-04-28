#! /bin/bash

source .env
source scripts/shared/vars.sh
source scripts/shared/check_ownership.sh
source scripts/shared/exit_if_devcontainer.sh

check_ownership "$HOST_PLUGINS_DIR"

PROD_PLUGINS_DIR=$REMOTE_PROJECT_DIR/plugins
HOST_PLUGINS_ABS_DIR=$PWD/$HOST_PLUGINS_DIR



# # Create plugins dir if it doesn't exist
echo "Creating new plugins directory"
gcloud compute ssh \
  $USER@$VM \
  --zone=$ZONE \
  --command="mkdir -p $PROD_PLUGINS_DIR"

# Clear internals of the plugins directory
echo "Removing production plugins"
gcloud compute ssh \
  $USER@$VM \
  --zone=$ZONE \
  --command="rm -rf $PROD_PLUGINS_DIR/*"

# Upload content
echo "Pushing plugins..."
gcloud compute scp \
  --recurse \
  --zone $ZONE \
  --compress \
  $HOST_PLUGINS_ABS_DIR/* \
  $USER@$VM:$PROD_PLUGINS_DIR

# Adjust file privileges
echo "Adjusting file ownerships..."
gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --command "docker exec \
    basakbeykoz_wp_p \
    bash -c 'chown -R www-data:www-data /var/www/html/wp-content'" 