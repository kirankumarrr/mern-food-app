exports.postMessage = function(response,statusCode,messageObject){
    return response.status(statusCode).json(messageObject);
}