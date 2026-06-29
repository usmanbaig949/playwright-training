import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';

test.describe.configure({ mode: 'serial' });

test.describe('restful-api.dev CRUD assignments', () => {
  let createdId: string;

  test('POST /objects creates a new object', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: 'Playwright Test Laptop',
        data: {
          year: 2026,
          price: 1999.99,
          'CPU model': 'Intel Core i9',
          'Hard disk size': '1 TB',
        },
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.name).toBe('Playwright Test Laptop');
    expect(body.data.year).toBe(2026);
    expect(body.data.price).toBe(1999.99);
    createdId = body.id;
  });

  test('GET /objects returns a list', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('name');
  });

  test('GET /objects/{id} returns the created object', async ({ request }) => {
    expect(createdId, 'POST test must run first').toBeDefined();
    const response = await request.get(`${BASE_URL}/objects/${createdId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(createdId);
    expect(body.name).toBe('Playwright Test Laptop');
  });

  test('PUT /objects/{id} fully replaces the object', async ({ request }) => {
    expect(createdId).toBeDefined();
    const response = await request.put(`${BASE_URL}/objects/${createdId}`, {
      data: {
        name: 'Playwright Test Laptop (Updated)',
        data: {
          year: 2027,
          price: 2499.0,
          'CPU model': 'Apple M5',
          'Hard disk size': '2 TB',
          color: 'Space Black',
        },
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(createdId);
    expect(body.name).toBe('Playwright Test Laptop (Updated)');
    expect(body.data.year).toBe(2027);
    expect(body.data.color).toBe('Space Black');
  });

  test('PATCH /objects/{id} partially updates the object', async ({ request }) => {
    expect(createdId).toBeDefined();
    const response = await request.patch(`${BASE_URL}/objects/${createdId}`, {
      data: {
        name: 'Playwright Test Laptop (Patched)',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(createdId);
    expect(body.name).toBe('Playwright Test Laptop (Patched)');
  });

  test('DELETE /objects/{id} removes the object', async ({ request }) => {
    expect(createdId).toBeDefined();
    const response = await request.delete(`${BASE_URL}/objects/${createdId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('message');
    expect(body.message).toContain(createdId);

    const getAfterDelete = await request.get(`${BASE_URL}/objects/${createdId}`);
    expect(getAfterDelete.status()).toBe(404);
  });
});
