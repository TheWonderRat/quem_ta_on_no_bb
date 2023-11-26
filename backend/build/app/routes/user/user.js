"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// libraries
const express_1 = require("express");
// class imports
const router_class_1 = __importDefault(require("../../classes/router.class"));
// middlewares
const exporter_1 = require("../../middlewares/exporter");
// Controller
const exporter_2 = require("../../modules/controller/exporter");
class UserRouter extends router_class_1.default {
    constructor() {
        super((0, express_1.Router)(), new exporter_2.UserController());
        this.initRoutes();
    }
    // private methods
    initRoutes() {
        this.router.post(this.rootPath, exporter_1.UserMid.validateFormat, exporter_1.UserMid.validateUserFields, this.controller.registerUsers);
    }
}
exports.default = UserRouter;
// // create user
// userRouter.post(
//   '/criar-sessao',
//   celebrate({
//     [Segments.BODY]: {
//       // insert server side validation(1 uppercase, 1 number, and so on
//       login: Joi.number().required(),
//       senha: Joi.string().required(),
//     },
//   }),
//   AprovadoController.criarSessao,
// );
// userRouter.post(
//   '/ativar-conta',
//   celebrate({
//     [Segments.BODY]: {
//       // insert server side validation(1 uppercase, 1 number, and so on
//       login: Joi.number().required(),
//       senha: Joi.string().required(),
//       novaSenha: Joi.string().required(),
//     },
//   }),
//   AuthMid.hasToken,
//   AuthMid.hasValidToken,
//   AprovadoController.ativarConta,
// );
// userRouter.post(
//   '/atualizar-senha',
//   // isAuthenticated,
//   celebrate({
//     [Segments.BODY]: {
//       // insert server side validation(1 uppercase, 1 number, and so on
//       login: Joi.number().required(),
//       senha: Joi.string().required(),
//       novaSenha: Joi.string().required(),
//     },
//   }),
//   AuthMid.hasToken,
//   AuthMid.hasValidToken,
//   AprovadoController.atualizarSenha,
// );
// userRouter.post(
//   '/atualizar-listas',
//   // isAuthenticated,
//   celebrate({
//     [Segments.BODY]: {
//       // insert server side validation(1 uppercase, 1 number, and so on
//       login: Joi.number().required(),
//       senha: Joi.string().required(),
//     },
//   }),
//   AuthMid.hasToken,
//   AuthMid.hasValidToken,
//   AprovadoController.atualizarListas,
// );
