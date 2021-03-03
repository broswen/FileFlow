'use strict';

import { CopyObjectCommand, CopyObjectCommandInput, DeleteObjectCommand, DeleteObjectCommandInput, S3Client } from "@aws-sdk/client-s3";

const s3Client: S3Client = new S3Client({});

module.exports.handler = async (event: { bucket: string, key: string, prefix: string, arn: string }) => {

  console.log(event);

  const params: CopyObjectCommandInput = {
    Bucket: process.env.ARCHIVEBUCKET,
    Key: `${event.prefix}/${event.key}_${new Date().toISOString()}`,
    CopySource: encodeURIComponent(`${event.bucket}/${event.prefix}/${event.key}`)
  }

  console.info(params);

  await s3Client.send(new CopyObjectCommand(params));

  const params2: DeleteObjectCommandInput = {
    Bucket: event.bucket,
    Key: `${event.prefix}/${event.key}`
  }

  await s3Client.send(new DeleteObjectCommand(params2));
  // copy file from source bucket to archive bucket
  // same prefix, add timestamp suffix to key

  // delete file from source bucket

  // publish complete notificaton to SNS topic
  return 'OK';
};
