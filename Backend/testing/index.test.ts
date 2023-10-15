const request = require('supertest')
import { app } from '../index';

test('should handle a GET request to /api/vacations/1', async () => {
    const response = await request(app).get('/api/vacations/1');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    const expectedProperties = [
        'vacationid', 'destination', 'description', 'startdate', 'enddate',
        'price', 'imagefilename', 'followercount'
    ];

    const allObjectsMatchQuery = response.body.every((item) => {
        return expectedProperties.every((property) => property in item);
    });

    expect(allObjectsMatchQuery).toBe(true);
});


// test('should handle a POST request to /api/vacations/addVacation', async () => {
//     const response = await request(app).post('/api/vacations/addVacation');
//     expect(response.status).toBe(201);
//     expect(typeof response.body).toBe('object')    
// });

// test('should handle a delete request to /api/vacations/deleteVacation/110', async () => {
//     const response = await request(app).delete('/api/vacations/deleteVacation/110');
//     expect(response.status).toBe(204);
//     expect(typeof response.body).toBe('object');
// });

// test('should handle a put request to /api/vacations/editVacation/1', async () => {
//     const response = await request(app).put('/api/vacations/editVacation/1');
//     expect(response.status).toBe(204);
//     expect(typeof response.body).toEqual('object');
// });

// test('should handle a POST request to /api/users/register', async () => {
//     const response = await request(app).post('/api/users/register');
//     expect(response.status).toBe(200);
//     expect(typeof response.body).toBe('object')    
// });

// test('should handle a POST request to /api/users/login', async () => {
//     const response = await request(app).post('/api/users/login');
//     expect(response.status).toBe(200);
//     expect(typeof response.body).toBe('object')    
// });

// test('should handle a DELETE request to /api/followers/removeFollower', async () => {
//     const response = await request(app).delete('/api/followers/removeFollower');
//     expect(response.status).toBe(204);
//     expect(response.text).toBe('');
// });