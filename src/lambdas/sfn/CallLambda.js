'use strict';

module.exports.handler = async (event) => {

  // invoke async lambda with bucketname, file prefix/key, async token

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
