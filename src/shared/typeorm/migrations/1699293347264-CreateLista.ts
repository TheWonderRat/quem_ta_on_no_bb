import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateListaTresParaUm1699293347264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
          name: "lista",
          columns:[
            {
              name: "inscricao",
              type: "bigint",
              isPrimary: true,
            },
            {
              name: "tipo_lista",
              type: "varchar",
              isPrimary: true,
            },
            {
              name: "posicao",
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

      await queryRunner.createPrimaryKey("lista",["inscricao","tipo_lista","posicao"]);

      await queryRunner.createForeignKey("esta_na_lista",new TableForeignKey({
        columnNames: ["inscricao"],
        referencedColumnNames: ["inscricao"],
        referencedTableName: "aprovado"
      }));

      await queryRunner.createForeignKey("e_do_tipo", new TableForeignKey({
        columnNames: ["tipo_lista"],
        referencedColumnNames: ["nome"],
        referencedTableName: "tipo_lista"
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("lista")
    }

}
