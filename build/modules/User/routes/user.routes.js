"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const UsersController_1 = __importDefault(require("../controllers/UsersController"));

const authMiddlewares_1 = require("../../../shared/middlewares/authMiddlewares");

const userRouter = (0, express_1.Router)();
const usersController = new UsersController_1.default();
//create user
userRouter.post('/criar-sessao', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        //insert server side validation(1 uppercase, 1 number, and so on
        login: celebrate_1.Joi.number().required(),
        senha: celebrate_1.Joi.string().required(),
    },
}), usersController.criarSessao);
userRouter.post('/ativar-conta', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        //insert server side validation(1 uppercase, 1 number, and so on
        login: celebrate_1.Joi.number().required(),
        senha: celebrate_1.Joi.string().required(),
        novaSenha: celebrate_1.Joi.string().required(),
    },
}), 
//isAuthenticated,
usersController.ativarConta);
userRouter.post('/atualizar-senha', 
//isAuthenticated,
(0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        //insert server side validation(1 uppercase, 1 number, and so on
        login: celebrate_1.Joi.number().required(),
        senha: celebrate_1.Joi.string().required(),
        novaSenha: celebrate_1.Joi.string().required(),
    },
}), 
//isAuthenticated,
usersController.atualizarSenha);
userRouter.post('/atualizar-listas', 
//isAuthenticated,
(0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        //insert server side validation(1 uppercase, 1 number, and so on
        login: celebrate_1.Joi.number().required(),
        senha: celebrate_1.Joi.string().required(),
    },
}), authMiddlewares_1.isAuthenticated, usersController.atualizarListas);
//get user info [REQUIRES AUTH MIDDLEWARE] 
userRouter.get('/listar-todos', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        //insert server side validation(1 uppercase, 1 number, and so on
        candidatos: celebrate_1.Joi.number().required(),
        pagina: celebrate_1.Joi.number().required(),
    },
}), authMiddlewares_1.isAuthenticated, usersController.listarGeral);
//get user info [REQUIRES AUTH MIDDLEWARE and PASSWORD] 
userRouter.get('/listar-ppp', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        //insert server side validation(1 uppercase, 1 number, and so on
        candidatos: celebrate_1.Joi.number().required(),
        pagina: celebrate_1.Joi.number().required(),
    },
}), authMiddlewares_1.isAuthenticated, usersController.listarPPP);
userRouter.get('/listar-pcd', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        //insert server side validation(1 uppercase, 1 number, and so on
        candidatos: celebrate_1.Joi.number().required(),
        pagina: celebrate_1.Joi.number().required(),
    },
}), authMiddlewares_1.isAuthenticated, usersController.listarPCD);
//evitar o bug de erros personalizados do express
userRouter.patch('/dummy-secret-route/abandoned-route-that-will-be-here-until-i-fix-the-express-bug', ((request, response) => {
    return response.status(500).json({ status: "forbidden", message: "this is just a dummy route, until i fix the express bug it will be here!" });
}));
exports.default = userRouter;
