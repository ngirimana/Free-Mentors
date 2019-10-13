
// The request has succeded
exports.REQUEST_SUCCEEDED = 200;

// The request has succeeded and a new resource has been created
exports.RESOURCE_CREATED = 201;

// server could not understand the request due to invalid syntax
exports.BAD_REQUEST = 400;

// client must authenticate itself to get the requested response
exports.UNAUTHORIZED = 401;

// The client does not have access rights to the content
exports.FORBIDDEN = 403;

// The server can not find requested resource
exports.NOT_FOUND = 404;

// Response is sent on an idle connection
exports.REQUEST_TIMEOUT = 408;

// request conflicts with the current state of the server
exports.REQUEST_CONFLICT = 409;

// The server has encountered a situation it doesn't know how to handle
exports.SERVER_ERROR = 500;

// The server is not ready to handle the request

exports.SERVICE_UNAVAILABLE = 503;
