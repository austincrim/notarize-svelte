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
        if (!event.body)
            return { statusCode: 400, body: JSON.stringify({ message: 'please send a note :/' }) };
        const payload = JSON.parse(event.body);
        await client.put({ TableName: 'notes', Item: { ...payload } }).promise();
        return {
            statusCode: 201,
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e.message),
        };
    }
};
