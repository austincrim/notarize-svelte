exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Environment ${process.env.HELLO}` }),
    };
};
