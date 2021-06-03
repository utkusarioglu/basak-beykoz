#! /bin/bash

source scripts/shared/check_env.sh
source .env
source scripts/shared/vars.sh
source scripts/shared/check_ownership.sh
source scripts/shared/exit_if_devcontainer.sh

check_ownership "$HOST_UPLOADS_DIR"

PROD_UPLOADS_BACKUP_DIR=$REMOTE_CONTENT_DIR/wp-content/uploads
HOST_UPLOADS_BACKUP_DIR=$PWD/$HOST_UPLOADS_DIR

echo 'Clearing current uploads'
rm -rf $HOST_UPLOADS_DIR/*

echo "Downloading production uploads to \"$HOST_UPLOADS_DIR\"..."
gcloud compute scp \
  --recurse \
  --compress \
  --zone "$ZONE" \
  $USER@$VM:$PROD_UPLOADS_BACKUP_DIR/* \
  $HOST_UPLOADS_BACKUP_DIR
  