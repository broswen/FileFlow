'use strict';

import { GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput, S3Client } from "@aws-sdk/client-s3";
import { SendTaskSuccessCommand, SendTaskSuccessCommandInput, SFNClient } from "@aws-sdk/client-sfn";

const sfnClient: SFNClient = new SFNClient({});
const s3Client: S3Client = new S3Client({});

module.exports.handler = async (event: { bucket: string, prefix: string, key: string, token: string }) => {

  const params: GetObjectCommandInput = {
    Bucket: event.bucket,
    Key: event.key
  }

  const streamToString = (stream) =>
    new Promise((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });

  const file: GetObjectCommandOutput = await s3Client.send(new GetObjectCommand(params));

  const contents = await streamToString(file.Body);

  console.info('READING FILE CONTENTS');
  console.info(contents);

  const params2: SendTaskSuccessCommandInput = {
    output: JSON.stringify({ finishedTime: new Date().toISOString() }),
    taskToken: event.token
  }
  await sfnClient.send(new SendTaskSuccessCommand(params2));

  return 'OK';
};
