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
const typeorm_1 = require("typeorm");
class CreateListaTresParaUm1699293347264 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'lista',
                columns: [
                    {
                        name: 'inscricao',
                        type: 'bigint',
                        isPrimary: true,
                    },
                    {
                        name: 'tipo_lista',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'posicao',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }));
            yield queryRunner.createPrimaryKey('lista', ['inscricao', 'tipo_lista', 'posicao']);
            yield queryRunner.createForeignKey('esta_na_lista', new typeorm_1.TableForeignKey({
                columnNames: ['inscricao'],
                referencedColumnNames: ['inscricao'],
                referencedTableName: 'aprovado',
            }));
            yield queryRunner.createForeignKey('e_do_tipo', new typeorm_1.TableForeignKey({
                columnNames: ['tipo_lista'],
                referencedColumnNames: ['nome'],
                referencedTableName: 'tipo_lista',
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('lista');
        });
    }
}
exports.default = CreateListaTresParaUm1699293347264;
