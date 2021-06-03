#! /bin/bash

source scripts/shared/check_env.sh
source .env
source scripts/shared/vars.sh

PRODUCTION_UPLOADS_DIR="$REMOTE_PROJECT_DIR/wp-content/uploads"

echo "Creating directories..."
gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --project "$PROJECT" \
  --command \
  "sudo mkdir -p  $PRODUCTION_UPLOADS_DIR"

echo "Setting ownership and permissions for $PRODUCTION_UPLOADS_DIR..."
gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --project "$PROJECT" \
  --command \
  "sudo chown www-data:www-data $PRODUCTION_UPLOADS_DIR"

gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --project "$PROJECT" \
  --command \
  "sudo chmod 777 $PRODUCTION_UPLOADS_DIR"

echo "Pushing uploads to $PRODUCTION_UPLOADS_DIR..."
gcloud compute scp \
  --recurse \
  --compress \
  --zone "$ZONE" \
  --project "$PROJECT" \
  $HOST_UPLOADS_DIR/* \
  $USER@$VM:$PRODUCTION_UPLOADS_DIR 

echo "Adjusting permissions for $PRODUCTION_UPLOADS_DIR..."
gcloud compute ssh \
  $USER@$VM \
  --zone $ZONE \
  --project "$PROJECT" \
  --command \
  "sudo chmod 755 $PRODUCTION_UPLOADS_DIR"