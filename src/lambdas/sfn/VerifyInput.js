'use strict';

module.exports.handler = async (event) => {

  // call GetHead on file to verify it exists

  // call functionExists on lambda arn to verify it exists

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
