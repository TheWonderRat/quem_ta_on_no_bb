import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Turma1699878656685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'turmas',
      columns: [
        { name: 'criado_em', type: 'timestamp', default: 'now()' },
        { name: 'atualizado_em', type: 'timestamp', default: 'now()' },
        { name: 'numero_da_turma', type: 'smallint', isPrimary: true },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('turmas');
  }
}
