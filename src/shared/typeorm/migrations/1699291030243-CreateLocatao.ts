import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUnidadePosse1699291030243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "lotacao",
        columns:[
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
          //chave candidata com a cidade
            name: "nome",
            type: "varchar",
          },
          {
            name: "cidade",
            type: "varchar",
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
      
    /*
    await queryRunner.createForeignKey("name",
      new TableForeignKey({
       columnNames: [''],
        referencedColumnNames: [''],
        referencedTableName:""
      }));
    */
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("table")
    }

}
