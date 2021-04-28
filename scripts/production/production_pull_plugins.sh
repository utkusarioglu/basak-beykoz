#! /bin/bash

source .env
source scripts/shared/vars.sh
source scripts/shared/check_ownership.sh

check_ownership "$HOST_PLUGINS_DIR"

PROD_PLUGINS_DIR=$REMOTE_PROJECT_DIR/plugins
HOST_PLUGINS_ABS_DIR=$PWD/$HOST_PLUGINS_DIR

echo 'Clearing current plugins'
rm -rf $HOST_PLUGINS_ABS_DIR/*

echo "Downloading production plugins to \"$HOST_PLUGINS_DIR\"..."
gcloud compute scp \
  --recurse \
  --compress \
  --zone "$ZONE" \
  $USER@$VM:$PROD_PLUGINS_DIR/* \
  $HOST_PLUGINS_ABS_DIR