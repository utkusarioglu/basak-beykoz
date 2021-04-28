#! /bin/bash

source .env
source scripts/shared/vars.sh
source scripts/shared/check_ownership.sh

check_ownership 'backups'

CURRENT_DATE_TIME=`date +%Y%m%d-%H%M%S`
SQL_FILE_NAME="$CURRENT_DATE_TIME.sql"
PROD_SQL_BACKUP_DIR=${REMOTE_CONTENT_DIR}/backups/sql
HOST_SQL_BACKUP_DIR=${PWD}/${CONTAINER_BACKUPS_DIR}
REMOTE_BACKUP_FILE_PATH="$PROD_SQL_BACKUP_DIR/$SQL_FILE_NAME"
LOCAL_BACKUP_FILE_PATH="$HOST_SQL_BACKUP_DIR/$SQL_FILE_NAME"

echo "Creating backup: \"$REMOTE_BACKUP_FILE_PATH\""
gcloud beta compute ssh \
  --zone "$ZONE" \
  "$VM" \
  --project "$PROJECT" \
  --command "docker exec basakbeykoz_db_p \
      mysqldump \
      -uroot \
      -proot \
      exampledb 1> \"$REMOTE_BACKUP_FILE_PATH\" 2> /dev/null"

echo "Downloading \"$SQL_FILE_NAME\" to \"$CONTAINER_BACKUPS_DIR\"..."
gcloud compute scp \
  --compress \
  --zone $ZONE \
  $USER@$VM:$REMOTE_BACKUP_FILE_PATH \
  $LOCAL_BACKUP_FILE_PATH