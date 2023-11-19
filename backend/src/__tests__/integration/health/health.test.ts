// library
import supertest from 'supertest';

// App
import App from '../../../app/app';

describe('Sequência de testes para rota "/health"', () => {
  const OK: number = 200;
  const { app }: App = new App();
  const PATH: string = '/health';

  test('Verifica se retorna status OK e resposta adequada', async () => {
    const response = await supertest(app).get(PATH);

    expect(response.status).toBe(OK);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toMatch(/^Rota funcionando normalmente$/);
  });
});
