import { expect } from 'chai';
import request from 'supertest';
import { app } from '../index.js';
let authTokenAdmin;
let authTokenUser;
before(async function () {
    this.timeout(10000);
    // Login as admin
    const adminLoginRes = await request(app)
        .post('/api/admin/login')
        .send({ email: 'admin@gmail.com', password: 'admin123' });
    authTokenAdmin = adminLoginRes.body.token;
    // Login as user
    const userLoginRes = await request(app)
        .post('/api/login')
        .send({ email: 'testuser@gmail.com', password: 'testuser123' });
    authTokenUser = userLoginRes.body.token;
});
after(function () {
    process.exit();
});
describe('UserController', () => {
    // describe('adduser', () => {
    //     it('should add a new user', async () => {
    //         const res = await request(app)
    //             .post('/api/register')
    //             .send({
    //                 firstname: 'John',
    //                 lastname: 'Doe',
    //                 email: 'johndoe1111@example.com',
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
                email: 'testuser@gmail.com',
                password: 'testuser123',
            });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.includes('Logged in successfully');
            expect(res.body).to.have.property('token').that.is.a('string');
        });
        it('should return an error for invalid credentials', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                email: 'testing@gmail.com',
                password: 'wrongpassword',
            });
            expect(res.status).to.equal(401);
        });
        describe('getUsers', () => {
            it('should get all users successfully', async () => {
                const res = await request(app)
                    .get('/api/users')
                    .set('Authorization', `Bearer ${authTokenAdmin}`);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message').that.includes('Users retrieved successfully');
            });
        });
        describe('getUser', () => {
            it('should get user successfully', async () => {
                const res = await request(app)
                    .get('/api/users/660be6cf7b46315326437299')
                    .set('Authorization', `Bearer ${authTokenAdmin}`);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message').that.includes('User retrieved');
                expect(res.body).to.have.property('message');
            });
        });
        describe('deleteMessage', () => {
            it('should delete user successfully', async () => {
                const res = await request(app)
                    .delete('/api/user/delete/660d4a37b9541096deefbf01')
                    .set('Authorization', `Bearer ${authTokenAdmin}`);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message').that.includes('User deleted successfully');
            });
        });
    });
});
