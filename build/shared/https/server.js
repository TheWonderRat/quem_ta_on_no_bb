"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const routes_1 = __importDefault(require("./routes"));

const AppError_1 = __importDefault(require("../errors/AppError"));

require("../typeorm");

const app = (0, express_1.default)();
const PORT = 3001;
const IP_ADDR = '192.168.1.105';
//app.use((request: Request, response: Response) =>{console.log("this was called after all services")});
//app.use(cors());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use((0, celebrate_1.errors)());
//app.use((err:Error,req: Request,res: Response,next: NextFunction) =>{});
app.use((error, request, response, next) => {
    if (error instanceof AppError_1.default) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});
app.listen(PORT, async () => {
    //app.listen( PORT ,() =>{
    console.log(`server started on ${IP_ADDR}:${PORT}`);
});
