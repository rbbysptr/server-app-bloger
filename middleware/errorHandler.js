function errorHandler(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';

    switch (err.name) {
        case "OK":
            status = 200;
            message = "OK";
            break;
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = err.errors[0].message;
            break;
        case "InvalidInput":
            status = 400;
            message = "Email or password is required";
            break;
        case "FileRequired":
            status = 400;
            message = "File is required";
            break;
        case "id must be unique":
            status = 400;
            message = "name category Already Exists";
            break;
        case "Unauthenticated":
        case "JsonWebTokenError":
            status = 401;
            message = "User not valid";
            break;
        case "InvalidUser":
            status = 401;
            message = "User not found or password does not match";
            break;
        case "Unauthorized":
            status = 403;
            message = "Forbidden";
            break;
        case "NotFound":
            status = 404;
            message = "Data not found";
            break;
    }

    res.status(status).json({ message });
}

module.exports = errorHandler;
