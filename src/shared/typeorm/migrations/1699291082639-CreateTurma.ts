import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTurma1699291082639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
          name: "turma",
          columns:[
            {
              name: "id",
              type: "int",
              isPrimary: true,
            },
            {
              name: 'created_at',
              type:  'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type:  'timestamp',
              default: 'now()'
            },
          ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("turma")
    }

}
