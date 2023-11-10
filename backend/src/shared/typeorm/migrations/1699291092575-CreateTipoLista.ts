import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateLista1699291092575 implements MigrationInterface {
  private readonly tableName = 'tipo_lista';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'nome',
          type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
