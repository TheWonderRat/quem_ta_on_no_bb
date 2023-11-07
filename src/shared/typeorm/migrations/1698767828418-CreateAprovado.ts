import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUser1698767828418 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
          name: "aprovado",
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
            name: 'data_questionario',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'data_qualificacao',
            type: 'timestamp',
            isNullable: true
          },
          {
          //referencia situacao
            name: 'situacao',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'lotacao',
            type: 'int',
            isNullable: true
          },
          {
            name: 'turma',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'criado_em',
            type:  'timestamp',
            default: 'now()'
          },
          {
            name: 'atualizado_em',
            type:  'timestamp',
            default: 'now()'
          },
        ] 
      }))
        /* atributos de referencia
           * situacao
           * unidade nullable
           * posicao PPP nullable,
           * posicao PCD nullable, 
           * turma nullable,
           * posicao
        */
        await queryRunner.createForeignKey(
          "esta_na_situacao",
          new TableForeignKey({
            columnNames:["situacao"],
            referencedColumnNames: ["nome"],
            referencedTableName: "situacao",
          })
        );
        await queryRunner.createForeignKey(
          "esta_na_turma",
          new TableForeignKey({
            columnNames:["turma"],
            referencedColumnNames: ["nome"],
            referencedTableName: "turma",
          })
        );
        await queryRunner.createForeignKey(
          "empossado_na_lotacao",
          new TableForeignKey({
            columnNames:["lotacao"],
            referencedColumnNames: ["id"],
            referencedTableName: "lotacao",
          })
        );

        await queryRunner.createForeignKey(
          "esta_nas_listas",
          new TableForeignKey({
            columnNames:["inscricao"],
            referencedColumnNames: ["inscricao"],
            referencedTableName: "lista",
          })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('usuario');
    }

}
