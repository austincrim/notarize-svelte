const AWS = require('aws-sdk');
require('dotenv').config();

const client = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

exports.handler = async function (event, context) {
    try {
        const payload = JSON.parse(event.body);
        await client.delete({ TableName: 'notes', Key: { id: payload.id } }).promise();
        return {
            statusCode: 204,
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e.message),
        };
    }
};
