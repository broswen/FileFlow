'use strict';

module.exports.handler = async (event) => {
  // copy file from source bucket to archive bucket
  // same prefix, add timestamp suffix to key

  // delete file from source bucket

  // publish complete notificaton to SNS topic
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
