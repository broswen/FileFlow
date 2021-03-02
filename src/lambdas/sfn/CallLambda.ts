'use strict';

import { InvokeCommand, InvokeCommandInput, LambdaClient } from "@aws-sdk/client-lambda";

const lambdaClient: LambdaClient = new LambdaClient({});

module.exports.handler = async (event: { token: string, input: { bucket: string, key: string, prefix: string, arn: string } }) => {

  console.log(event);
  // invoke async lambda with bucketname, file prefix/key, async token

  const params: InvokeCommandInput = {
    FunctionName: event.input.arn,
    InvocationType: 'Event',
    Payload: Buffer.from(JSON.stringify({ token: event.token, bucket: event.input.bucket, prefix: event.input.prefix, key: event.input.key })),
  }

  await lambdaClient.send(new InvokeCommand(params));

  return 'OK';
};
