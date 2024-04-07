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
describe('BlogController', () => {
    describe('addComment', () => {
        it('should add a comment to a blog successfully', async () => {
            const res = await request(app)
                .post('/api/blog/66056563021ca1042671ada8/comment')
                .send({ content: 'Test Comment Content' })
                .set('Authorization', `Bearer ${authTokenUser}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.includes('Comment added successfully');
        });
    });
    describe('likeBlog', () => {
        it('should like a blog successfully', async () => {
            const res = await request(app)
                .post('/api/blog/66056563021ca1042671ada8/like')
                .set('Authorization', `Bearer ${authTokenUser}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.includes('Blog liked successfully');
        });
    });
    describe('addPost', () => {
        it('should add a post successfully', async () => {
            const messageData = {
                image: 'Test content.url',
                title: 'Test contentTest content',
                subtitle: 'Test contentTest contentTest content',
                content: 'Test content',
            };
            const res = await request(app)
                .post('/api/blog/addblog')
                .send(messageData)
                .set('Authorization', `Bearer ${authTokenAdmin}`);
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message').that.includes('Blog Added successfully');
            expect(res.body).to.have.property('message');
        });
    });
});
