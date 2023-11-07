"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AtivarContaService_1 = __importDefault(require("../services/AtivarContaService"));
const AtualizarSenhaService_1 = __importDefault(require("../services/AtualizarSenhaService"));
const AtualizarSenhaService_2 = __importDefault(require("../services/AtualizarSenhaService"));
const CriarSessaoService_1 = __importDefault(require("../services/CriarSessaoService"));
const ListarGeralService_1 = __importDefault(require("../services/ListarGeralService"));
const ListarPCDService_1 = __importDefault(require("../services/ListarPCDService"));
const ListarPPPService_1 = __importDefault(require("../services/ListarPPPService"));
class UserController {
    async ativarConta(request, response, nextFunction) {
        const indexUsers = new AtivarContaService_1.default();
        //const {name, email, password} = request.body;
        //TODO:: filtrar os parametros aqui
        const users = await indexUsers.execute(request.body);
        /*
              .then( (users) =>{
                  return users;
              })
              .catch( (error) =>{
                  nextFunction(error);
              });
      */
        return response.json(users);
    }
    async criarSessao(request, response, nextFunction) {
        const criarSessao = new CriarSessaoService_1.default();
        const users = await criarSessao.execute(request.body);
        /*
              .then( (users) =>{
                  return users;
              })
              .catch( (error) =>{
                  nextFunction(error);
              });
      */
        return response.json(users);
    }
    async atualizarSenha(request, response, nextFunction) {
        const indexUsers = new AtualizarSenhaService_1.default();
        const users = await indexUsers.execute(request.body);
        /*
              .then( (users) =>{
                  return users;
              })
              .catch( (error) =>{
                  nextFunction(error);
              });
        */
        return response.json(users);
    }
    async listarGeral(request, response, nextFunction) {
        const indexUsers = new ListarGeralService_1.default();
        const users = await indexUsers.execute(request.body);
        /*
                .then( (users) =>{
                    return users;
                })
                .catch( (error) =>{
                    nextFunction(error);
                });
        */
        return response.json(users);
    }
    async listarPPP(request, response, nextFunction) {
        const indexUsers = new ListarPPPService_1.default();
        //TODO:: filtrar os parametros aqui
        const users = await indexUsers.execute(request.body);
        /*
              .then( (users) =>{
                  return users;
              })
              .catch( (error) =>{
                  nextFunction(error);
              });
      */
        return response.json(users);
    }
    async listarPCD(request, response, nextFunction) {
        const indexUsers = new ListarPCDService_1.default();
        //TODO:: filtrar os parametros aqui
        const users = await indexUsers.execute(request.body);
        /*
              .then( (users) =>{
                  return users;
              })
              .catch( (error) =>{
                  nextFunction(error);
              });
      */
        return response.json(users);
    }
    async atualizarListas(request, response, nextFunction) {
        const indexUsers = new AtualizarSenhaService_2.default();
        //TODO:: filtrar os parametros aqui
        const users = await indexUsers.execute(request.body);
        /*
                .then( (users) =>{
                    return users;
                })
                .catch( (error) =>{
                    nextFunction(error);
                });
        */
        return response.json(users);
    }
}
exports.default = UserController;
