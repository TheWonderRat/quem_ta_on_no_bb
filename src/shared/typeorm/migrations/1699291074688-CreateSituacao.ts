import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateSituacao1699291074688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({ 
          name: "situacao",
          columns:[
            {
              name: "nome",
              type: "varchar",
              isPrimary: true
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
      await queryRunner.dropTable("situacao");
    }

}
