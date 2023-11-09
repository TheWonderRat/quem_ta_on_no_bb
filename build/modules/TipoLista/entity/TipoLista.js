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
exports.TipoLista = void 0;
const typeorm_1 = require("typeorm");
const Lista_1 = require("../../Lista/entity/Lista");
let TipoLista = class TipoLista {
};
__decorate([
    (0, typeorm_1.OneToMany)(() => Lista_1.Lista, lista => lista.tipoLista),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], TipoLista.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], TipoLista.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], TipoLista.prototype, "updatedAt", void 0);
TipoLista = __decorate([
    (0, typeorm_1.Entity)('tipo_lista')
], TipoLista);
exports.TipoLista = TipoLista;
