const request = require('supertest');

const app = require('../app');

let server;

beforeEach(() => {
  app
    .start(3000, 'mongodb://localhost:27017/nordicshop')
    .then((httpserver) => {
      server = httpserver;
    });
});

afterEach((done) => {
  if (server) {
    server.close();
    done();
  }
});

// GET /api/404
test('GET /api/404', () => request(app)
  .get('/api/404')
  .then((res) => {
    expect(res.statusCode).toBe(404);
  }));

// GET /api/users
test('GET /api/users', () => request(app)
  .get('/api/users')
  .then((res) => {
    expect(res.statusCode).toBe(200);
    expect(res.body.header).toBeDefined();
    expect(res.body.header.count).toBeGreaterThan(0);
    expect(res.body.body).toBeDefined();
    expect(res.body.body.length).toBeGreaterThan(0);
  }));

// GET /api/users/:ip
test('GET /api/users/Tiến Nguyễn', () => request(app)
  .get('/api/users/5c1a3ccee3676aeae574e2af')
  .then((res) => {
    expect(res.statusCode).toBe(200);
    expect(res.body.header).toBeDefined();
    expect(res.body.header.count).toBe(1);
    expect(res.body.body).toBeDefined();
    expect(res.body.body['_id']).toBe('5c1a3ccee3676aeae574e2af');
    expect(res.body.body.email).toBe('tiennguyen@nordiccoder.com');
  }));

//*
// POST /api/users
test('POST /api/users', () => {
  const productData = {
    firstName: 'Unit',
    lastName: 'Test',
    gender: 'male',
    username: 'unittest',
    email: 'unitest@email.co',
    role: 'user',
  };

  return request(app)
    .post('/api/users')
    .send(productData)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.header).toBeDefined();
      expect(res.body.header.count).toBe(1);
      expect(res.body.body).toBeDefined();
      expect(res.body.body.email).toBe('unitest@email.co');
    });
});

/*/
// POST /api/users
test('POST /api/users', () => {
  const productData = {
    firstName: 'Unit',
    lastName: 'Test',
    gender: 'male',
    username: 'unittest',
    email: 'unitest@email.co',
    role: 'user',
  };

  let id;

  return request(app)
    .post('/api/users')
    .send(productData)
    .then((res) => {
      id = res.body.body['_id'];
      expect(res.statusCode).toBe(200);
      expect(res.body.header).toBeDefined();
      expect(res.body.header.count).toBe(1);
      expect(res.body.body).toBeDefined();
      expect(res.body.body.email).toBe('unitest@email.co');
    })
    .then(() => request(app).delete(`/api/users/${id}`));
});
//*/

// GET /api/products
test('GET /api/products', () => request(app)
  .get('/api/products')
  .then((res) => {
    expect(res.statusCode).toBe(200);
    expect(res.body.header).toBeDefined();
    expect(res.body.header.count).toBeGreaterThan(0);
    expect(res.body.body).toBeDefined();
    expect(res.body.body.length).toBeGreaterThan(0);
  }));

// GET /api/products/:ip
test('GET /api/products/Winter Coat from France', () => request(app)
  .get('/api/products/5c1a3cede3676aeae574e2b4')
  .then((res) => {
    expect(res.statusCode).toBe(200);
    expect(res.body.header).toBeDefined();
    expect(res.body.header.count).toBe(1);
    expect(res.body.body).toBeDefined();
    expect(res.body.body['_id']).toBe('5c1a3cede3676aeae574e2b4');
    expect(res.body.body.name).toBe('Winter Coat from France');
  }));
