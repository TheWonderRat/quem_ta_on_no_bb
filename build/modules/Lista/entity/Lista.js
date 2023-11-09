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
exports.Lista = void 0;
const Aprovado_1 = require("../../Aprovado/entity/Aprovado");
const TipoLista_1 = require("../../TipoLista/entity/TipoLista");
const typeorm_1 = require("typeorm");
let Lista = class Lista {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'bigint' }),
    (0, typeorm_1.ManyToMany)(() => Aprovado_1.Aprovado, aprovado => aprovado.inscricao),
    __metadata("design:type", Number)
], Lista.prototype, "inscricao", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, typeorm_1.ManyToOne)(() => TipoLista_1.TipoLista, tipoLista => tipoLista.nome),
    __metadata("design:type", String)
], Lista.prototype, "tipoLista", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Lista.prototype, "posicao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Lista.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Lista.prototype, "updatedAt", void 0);
Lista = __decorate([
    (0, typeorm_1.Entity)('lista')
], Lista);
exports.Lista = Lista;
