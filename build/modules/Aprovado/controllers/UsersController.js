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
    constructor() {
        // Instância de todas as classes de serviço necessárias.
        this.ativarContaService = new AtivarContaService_1.default();
        this.atualizarSenhaService = new AtualizarSenhaService_1.default();
        this.criarSessaoService = new CriarSessaoService_1.default();
        this.listarGeralService = new ListarGeralService_1.default();
        this.listarPPPService = new ListarPPPService_1.default();
        this.listarPCDService = new ListarPCDService_1.default();
        this.listarTresParaUmService = new ListarTresParaUmService_1.default();
        this.listarQuatroPraUMService = new ListarQuatroParaUmService_1.default();
        this.listarConvocacoesService = new ListarConvocacoes_1.default();
        this.updateUsersService = new AtualizarListasService_1.default();
    }
    // Métodos públicos que serão chamados pelas rotas.
    ativarConta(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.ativarContaService.execute(request.body);
            return response.json(users);
        });
    }
    criarSessao(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.criarSessaoService.execute(request.body);
            return response.json(users);
        });
    }
    atualizarSenha(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.atualizarSenhaService.execute(request.body);
            return response.json(users);
        });
    }
    listarGeral(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { candidatos, pagina } = request.query;
            // o celebrate garante que sempre serao numeros
            const users = yield this.listarGeralService
                .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    listarPPP(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:: filtrar os parâmetros aqui
            const { candidatos, pagina } = request.query;
            // o celebrate garante que sempre serão números
            const users = yield this.listarPPPService
                .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    listarPCD(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:: filtrar os parametros aqui
            const { candidatos, pagina } = request.query;
            const users = yield this.listarPCDService
                .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    listarTresParaUm(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:: filtrar os parametros aqui
            const { candidatos, pagina } = request.query;
            // possivel por conta da validacao do express
            const users = yield this.listarTresParaUmService
                .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    listarQuatroParaUm(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:: filtrar os parametros aqui
            const { candidatos, pagina } = request.query;
            // possivel por conta da validacao do express
            const users = yield this.listarQuatroPraUMService
                .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    listarConvocacoes(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:: filtrar os parametros aqui
            const { candidatos, pagina } = request.query;
            // possivel por conta da validacao do express
            const users = yield this.listarConvocacoesService
                .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });
            return response.json(users);
        });
    }
    atualizarListas(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:: filtrar os parametros aqui
            const users = yield this.updateUsersService.execute(request.body);
            return response.json(users);
        });
    }
}
exports.default = UserController;
