'use strict';

import { SendTaskFailureCommand, SendTaskFailureCommandInput, SendTaskSuccessCommand, SendTaskSuccessCommandInput, SFNClient } from "@aws-sdk/client-sfn";

const sfnClient: SFNClient = new SFNClient({});

module.exports.handler = async (event: { bucket: string, prefix: string, key: string, token: string }) => {

  if (Math.random() > 0.5) {
    console.info('value was > 0.5');
    const params2: SendTaskSuccessCommandInput = {
      output: JSON.stringify({ finishedTime: new Date().toISOString(), message: 'coin was heads :-)' }),
      taskToken: event.token
    }
    await sfnClient.send(new SendTaskSuccessCommand(params2));

  } else {
    console.info('value was <= 0.5');
    const params2: SendTaskFailureCommandInput = {
      error: 'the coin flip was tails :-(',
      cause: 'Math.random() value was <= 0.5',
      taskToken: event.token
    }
    await sfnClient.send(new SendTaskFailureCommand(params2));
    throw new Error('Math.random() value was <= 0.5');
  }

  return 'OK';
};
