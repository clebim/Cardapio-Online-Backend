import request from 'supertest';
import app from '../../src/app';

describe('testando', () => {
  beforeEach(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 200)); // avoid jest open handle error
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/register').send({
      restaurant_name: 'Restaurante do Crebim',
      email: 'crebim@gmail.com',
      password: '123456',
      confirmation_password: '123456',
      city: 'Uberlandia',
      neighborhood: 'Cidade Jardim',
      street: 'Rua das rosas',
      number: '730',
      zip_code: '38124-134',
    });

    expect(response.body.success).toBe(true);
    expect(response.body.user.id).toBe(1);
  });

  it('should not be able to create a new user with same email from another', async () => {
    const response = await request(app).post('/register').send({
      restaurant_name: 'Restaurante do Crebim',
      email: 'crebim@gmail.com',
      password: '123456',
      confirmation_password: '123456',
      city: 'Uberlandia',
      neighborhood: 'Cidade Jardim',
      street: 'Rua das rosas',
      number: '730',
      zip_code: '38124-134',
    });

    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty('message');
  });

  it('should not be able to create a new user with password and differente condirmation password ', async () => {
    const response = await request(app).post('/register').send({
      restaurant_name: 'Restaurante do Crebim',
      email: 'crebim@gmail.com',
      password: '123456',
      confirmation_password: '000000',
      city: 'Uberlandia',
      neighborhood: 'Cidade Jardim',
      street: 'Rua das rosas',
      number: '730',
      zip_code: '38124-134',
    });

    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty('message');
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 200)); // avoid jest open handle error
  });
});
