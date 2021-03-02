'use strict';

import { S3Client } from "@aws-sdk/client-s3";

const s3Client: S3Client = new S3Client({});

module.exports.handler = async (event: { bucket: string, prefix: string, key: string, arn: string }) => {

  console.log(event);

  // TODO is this necessary? or just catch in error handlers?
  // call GetHead on file to verify it exists

  // call functionExists on lambda arn to verify it exists

  return event;
};
