import { expect } from 'chai';
import request from 'supertest';
import { app } from '../index.js';
describe('UserController', () => {
    // describe('adduser', () => {
    //     it('should add a new user', async () => {
    //         const res = await request(app)
    //             .post('/api/register')
    //             .send({
    //                 firstname: 'John',
    //                 lastname: 'Doe',
    //                 email: 'john.doe1@example.com',
    //                 password: 'password123',
    //             });
    //         expect(res.status).to.equal(201);
    //         expect(res.body).to.have.property('message').that.includes('User created successfully');
    //     });
    // });
    describe('loginUser', () => {
        it('should log in a user with valid credentials', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                email: 'john.doe1@example.com',
                password: 'password123',
            });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.includes('Logged in successfully');
            expect(res.body).to.have.property('token').that.is.a('string');
        });
        it('should return an error for invalid credentials', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                email: 'john.doe@example.com',
                password: 'wrongpassword',
            });
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('message').that.is.a('string');
        });
    });
});
