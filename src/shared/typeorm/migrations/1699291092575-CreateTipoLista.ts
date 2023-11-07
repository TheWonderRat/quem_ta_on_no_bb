import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateLista1699291092575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
          name: "tipo_lista",
          columns:[
            {
              name: "nome",
              type: "varchar",
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
      await queryRunner.dropTable("tipo_lista")
    }

}
