'use strict';

import { SFNClient, StartExecutionCommand, StartExecutionCommandInput } from "@aws-sdk/client-sfn";
import { GetParameterCommand, GetParameterCommandInput, GetParameterCommandOutput, SSMClient } from "@aws-sdk/client-ssm";
import { S3Event, SQSEvent } from "aws-lambda";

const ssmClient: SSMClient = new SSMClient({});
const sfnClient: SFNClient = new SFNClient({});

module.exports.handler = async (event: SQSEvent) => {

  for (let sqsRecord of event.Records) {
    const json = (JSON.parse(sqsRecord.body) as S3Event);

    for (let s3Record of json.Records) {
      const parts: string[] = s3Record.s3.object.key.split('/');
      const key: string = parts.pop();
      const prefix: string = parts.join('/');
      const bucket: string = s3Record.s3.bucket.name;

      const executionInfo = { bucket, prefix, key, arn: '' };

      const params: GetParameterCommandInput = {
        Name: prefix
      }

      let data: GetParameterCommandOutput;
      try {
        data = await ssmClient.send(new GetParameterCommand(params));
      } catch (error: any) {
        if (error.name === "ParameterNotFound") {
          console.error("unknown file prefix, parameter not found");
          // TODO return this event for DLQ
          continue;
        } else {
          throw error;
        }
      }

      executionInfo.arn = data.Parameter.Value;
      console.info("starting execution with", executionInfo);
      const params2: StartExecutionCommandInput = {
        stateMachineArn: process.env.FFSM,
        input: JSON.stringify(executionInfo),
      }
      const result = await sfnClient.send(new StartExecutionCommand(params2));
      console.info(result);
    };
  };

  return {
    statusCode: 200
  };
};
