const AWS = require('aws-sdk');
require('dotenv').config();

const client = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

exports.handler = async function (event, context) {
    try {
        const results = await client.scan({ TableName: 'notes' }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(results.Items),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e.message),
        };
    }
};
