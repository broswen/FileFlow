'use strict';

module.exports.handler = async (event) => {

  // for each sqsevent 
  // get file prefix and key
  // get parameter from SSM PS by prefix
  // if doesn't exist, return to SQS
  // if exists, start SFN workflow with bucketname, file prefix/key, lambda arn

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      }
    )
  };
};
