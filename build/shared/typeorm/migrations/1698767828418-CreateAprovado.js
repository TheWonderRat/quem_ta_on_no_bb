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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-lines-per-function */
const typeorm_1 = require("typeorm");
class CreateUser1698767828418 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'aprovado',
                columns: [
                    {
                        name: 'inscricao',
                        type: 'bigint',
                        isPrimary: true,
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                    },
                    {
                        name: 'senha',
                        type: 'varchar',
                    },
                    {
                        name: 'data_posse',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'data_questionario',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'data_qualificacao',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        // referencia situacao
                        name: 'situacao',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'lotacao',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'turma',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'criado_em',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'atualizado_em',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }));
            /* atributos de referencia
                   * situacao
                   * unidade nullable
                   * posicao PPP nullable,
                   * posicao PCD nullable,
                   * turma nullable,
                   * posicao
                */
            yield queryRunner.createForeignKey('esta_na_situacao', new typeorm_1.TableForeignKey({
                columnNames: ['situacao'],
                referencedColumnNames: ['nome'],
                referencedTableName: 'situacao',
            }));
            yield queryRunner.createForeignKey('esta_na_turma', new typeorm_1.TableForeignKey({
                columnNames: ['turma'],
                referencedColumnNames: ['nome'],
                referencedTableName: 'turma',
            }));
            yield queryRunner.createForeignKey('empossado_na_lotacao', new typeorm_1.TableForeignKey({
                columnNames: ['lotacao'],
                referencedColumnNames: ['id'],
                referencedTableName: 'lotacao',
            }));
            yield queryRunner.createForeignKey('esta_nas_listas', new typeorm_1.TableForeignKey({
                columnNames: ['inscricao'],
                referencedColumnNames: ['inscricao'],
                referencedTableName: 'lista',
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('usuario');
        });
    }
}
exports.default = CreateUser1698767828418;
