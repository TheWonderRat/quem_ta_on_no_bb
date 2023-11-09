"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aprovado = void 0;
const typeorm_1 = require("typeorm");
const Lista_1 = require("../../Lista/entity/Lista");
const Situacao_1 = require("../../Situacao/entity/Situacao");
const Turma_1 = require("../../Turma/entity/Turma");
let Aprovado = class Aprovado {
};
__decorate([
    (0, typeorm_1.ManyToMany)(() => Lista_1.Lista, lista => lista.inscricao),
    (0, typeorm_1.ManyToOne)(() => Situacao_1.Situacao, situacao => situacao.nome),
    (0, typeorm_1.PrimaryColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Aprovado.prototype, "inscricao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Aprovado.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Aprovado.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.ManyToOne)(() => Situacao_1.Situacao, situacao => situacao.nome),
    __metadata("design:type", String)
], Aprovado.prototype, "situacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Aprovado.prototype, "dataPosse", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Aprovado.prototype, "dataQuestionario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Aprovado.prototype, "dataQualificacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Turma_1.Turma, turma => turma.id),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Aprovado.prototype, "lotacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Turma_1.Turma, turma => turma.id),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Aprovado.prototype, "turma", void 0);
Aprovado = __decorate([
    (0, typeorm_1.Entity)('aprovado')
], Aprovado);
exports.Aprovado = Aprovado;
