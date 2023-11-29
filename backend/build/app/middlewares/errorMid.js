"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SSOT
const exporter_1 = require("../SSOT/exporter");
class ErrorMid {
    static errorHandler(error, __req, res, __next) {
        if (!error.errorInfo) {
            console.error(error);
            return res
                .status(exporter_1.httpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: exporter_1.errorMessages.SERVER_SIDE_ERROR });
        }
        const { statusCode, message } = error.errorInfo;
        return res.status(statusCode).send({ message });
    }
}
exports.default = ErrorMid;
