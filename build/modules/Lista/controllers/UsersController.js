"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AtivarContaService_1 = __importDefault(require("../services/AtivarContaService"));
const AtualizarSenhaService_1 = __importDefault(require("../services/AtualizarSenhaService"));
const AtualizarListasService_1 = __importDefault(require("../services/AtualizarListasService"));
const CriarSessaoService_1 = __importDefault(require("../services/CriarSessaoService"));
const ListarGeralService_1 = __importDefault(require("../services/ListarGeralService"));
const ListarConvocacoes_1 = __importDefault(require("../services/ListarConvocacoes"));
const ListarPCDService_1 = __importDefault(require("../services/ListarPCDService"));
const ListarPPPService_1 = __importDefault(require("../services/ListarPPPService"));
const ListarTresParaUmService_1 = __importDefault(require("../services/ListarTresParaUmService"));
const ListarQuatroParaUmService_1 = __importDefault(require("../services/ListarQuatroParaUmService"));
class UserController {
    ativarConta(request, response, nextFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const ativarConta = new AtivarContaService_1.default();
            const users = yield ativarConta.execute(request.body);
            return response.json(users);
        });
    }
    criarSessao(request, response, nextFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const criarSessao = new CriarSessaoService_1.default();
            const users = yield criarSessao.execute(request.body);
            return response.json(users);
        });
    }
    atualizarSenha(request, response, nextFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const atualizarSenha = new AtualizarSenhaService_1.default();
            const users = yield atualizarSenha.execute(request.body);
            return response.json(users);
        });
    }
    listarGeral(request, response, nextFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const listarGeral = new ListarGeralService_1.default();
            const { candidatos, pagina } = request.query;
            //o celebrate garante que sempre serao numeros
            const users = yield listarGeral.execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    listarPPP(request, response, nextFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const listarPPP = new ListarPPPService_1.default();
            //TODO:: filtrar os parametros aqui
            const { candidatos, pagina } = request.query;
            //o celebrate garante que sempre serao numeros
            const users = yield listarPPP.execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    listarPCD(request, response, nextFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const listarPCD = new ListarPCDService_1.default();
            //TODO:: filtrar os parametros aqui
            const { candidatos, pagina } = request.query;
            const users = yield listarPCD.execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    listarTresParaUm(request, response, nextFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const listarConvocacoes = new ListarTresParaUmService_1.default();
            //TODO:: filtrar os parametros aqui
            const { candidatos, pagina } = request.query;
            //possivel por conta da validacao do express
            const users = yield listarConvocacoes.execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    listarQuatroParaUm(request, response, nextFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const listarConvocacoes = new ListarQuatroParaUmService_1.default();
            //TODO:: filtrar os parametros aqui
            const { candidatos, pagina } = request.query;
            //possivel por conta da validacao do express
            const users = yield listarConvocacoes.execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    listarConvocacoes(request, response, nextFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const listarConvocacoes = new ListarConvocacoes_1.default();
            //TODO:: filtrar os parametros aqui
            const { candidatos, pagina } = request.query;
            //possivel por conta da validacao do express
            const users = yield listarConvocacoes.execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    atualizarListas(request, response, nextFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUsers = new AtualizarListasService_1.default();
            //TODO:: filtrar os parametros aqui
            const users = yield updateUsers.execute(request.body);
            return response.json(users);
        });
    }
}
exports.default = UserController;
