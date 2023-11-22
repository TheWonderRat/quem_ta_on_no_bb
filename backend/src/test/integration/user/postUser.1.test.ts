// library
import supertest from 'supertest';

// SSOT
import { errorMessages, httpStatus, pathNames } from '../../../app/SSOT/exporter';

// Mocks
import { request } from '../../mocks/exporter';

// Application
import App from '../../../app/app';

describe('Sequência de testes sobre os middlewares da rota de usuários', () => {
  const { app }: App = new App();
  const path: string = pathNames.user;

  test('Se retorna BAD REQUEST(400) e mensagem de erro, caso faltem campos de registro', async () => {
    const response0 = await supertest(app).post(path).send(request.bodyFull);
    const response1 = await supertest(app).post(path).send([request.bodyNoPcd]);
    const response2 = await supertest(app).post(path).send([request.bodyNoPpp]);
    const response3 = await supertest(app).post(path).send([request.bodyNoRegistry]);
    const response4 = await supertest(app).post(path).send([request.bodyNoBackup]);
    const response5 = await supertest(app).post(path).send([request.bodyNoGlobal]);
    const response6 = await supertest(app).post(path).send([request.bodyNoName]);

    expect(response0.status).toBe(httpStatus.BAD_REQUEST);
    expect(response1.status).toBe(httpStatus.BAD_REQUEST);
    expect(response2.status).toBe(httpStatus.BAD_REQUEST);
    expect(response3.status).toBe(httpStatus.BAD_REQUEST);
    expect(response4.status).toBe(httpStatus.BAD_REQUEST);
    expect(response5.status).toBe(httpStatus.BAD_REQUEST);
    expect(response6.status).toBe(httpStatus.BAD_REQUEST);

    expect(response0.body).toHaveProperty('message');
    expect(response1.body).toHaveProperty('message');
    expect(response2.body).toHaveProperty('message');
    expect(response3.body).toHaveProperty('message');
    expect(response4.body).toHaveProperty('message');
    expect(response5.body).toHaveProperty('message');
    expect(response6.body).toHaveProperty('message');

    expect(response0.body.message).toBe(errorMessages.INVALID_FORMAT_REGISTER);
    expect(response1.body.message).toBe(errorMessages.MISSING_FIELD_REGISTER);
    expect(response2.body.message).toBe(errorMessages.MISSING_FIELD_REGISTER);
    expect(response3.body.message).toBe(errorMessages.MISSING_FIELD_REGISTER);
    expect(response4.body.message).toBe(errorMessages.MISSING_FIELD_REGISTER);
    expect(response5.body.message).toBe(errorMessages.MISSING_FIELD_REGISTER);
    expect(response6.body.message).toBe(errorMessages.MISSING_FIELD_REGISTER);
  });

  test('Se retorna BAD REQUEST(400) e mensagem de erro, caso o algum dos campos tenha formato inválido', async () => {
    const response0 = await supertest(app).post(path).send([request.bodyInvalidName]);
    const response1 = await supertest(app).post(path).send([request.bodyInvalidPcd]);
    const response2 = await supertest(app).post(path).send([request.bodyInvalidPpp]);
    const response3 = await supertest(app).post(path).send([request.bodyInvalidBackup]);
    const response4 = await supertest(app).post(path).send([request.bodyInvalidGlobal]);
    const response5 = await supertest(app).post(path).send([request.bodyInvalidPcdPosition]);
    const response6 = await supertest(app).post(path).send([request.bodyInvalidPppPosition]);
    const response7 = await supertest(app).post(path).send([request.bodyInvalidRegistry]);

    expect(response0.status).toBe(httpStatus.BAD_REQUEST);
    expect(response1.status).toBe(httpStatus.BAD_REQUEST);
    expect(response2.status).toBe(httpStatus.BAD_REQUEST);
    expect(response3.status).toBe(httpStatus.BAD_REQUEST);
    expect(response4.status).toBe(httpStatus.BAD_REQUEST);
    expect(response5.status).toBe(httpStatus.BAD_REQUEST);
    expect(response6.status).toBe(httpStatus.BAD_REQUEST);
    expect(response7.status).toBe(httpStatus.BAD_REQUEST);

    expect(response0.body).toHaveProperty('message');
    expect(response1.body).toHaveProperty('message');
    expect(response2.body).toHaveProperty('message');
    expect(response3.body).toHaveProperty('message');
    expect(response4.body).toHaveProperty('message');
    expect(response5.body).toHaveProperty('message');
    expect(response6.body).toHaveProperty('message');
    expect(response7.body).toHaveProperty('message');

    expect(response0.body.message).toBe(errorMessages.MISSING_FIELD_REGISTER);
    expect(response1.body.message).toBe(errorMessages.INVALID_PCD);
    expect(response2.body.message).toBe(errorMessages.INVALID_PPP);
    expect(response3.body.message).toBe(errorMessages.INVALID_BACKUP_REGISTER);
    expect(response4.body.message).toBe(errorMessages.INVALID_GLOBAL_POSITION);
    expect(response5.body.message).toBe(errorMessages.INVALID_PCD_POSITION);
    expect(response6.body.message).toBe(errorMessages.INVALID_PPP_POSITION);
    expect(response7.body.message).toBe(errorMessages.INVALID_REGISTRY);
  });
});
