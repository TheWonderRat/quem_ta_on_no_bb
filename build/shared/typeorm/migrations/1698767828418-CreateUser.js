"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1698767828418 = void 0;
const typeorm_1 = require("typeorm");
class CreateUser1698767828418 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "usuario",
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
                    isNullable: true
                },
                {
                    name: 'cidade_posse',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'lotacao',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'data_questionario',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'turma',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'posicao_ampla',
                    type: 'int'
                },
                {
                    name: 'posicao_ppp',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'posicao_pcd',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('usuario');
    }
}
exports.CreateUser1698767828418 = CreateUser1698767828418;
