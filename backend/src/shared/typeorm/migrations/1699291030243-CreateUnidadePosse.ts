import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUnidadePosse1699291030243 implements MigrationInterface {
  private readonly tableName = 'unidade_posse';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          generationStrategy: 'increment',
        },
        {
          // chave candidata com a cidade
          name: 'nome',
          type: 'varchar',
        },
        {
          name: 'cidade',
          type: 'varchar',
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
    await queryRunner.dropTable(this.tableName);
  }
}
