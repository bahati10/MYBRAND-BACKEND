import { expect } from 'chai';
import request from 'supertest';
import { app } from '../index.js';
let authToken;
before(async () => {
    const loginRes = await request(app)
        .post('/api/login')
        .send({ email: 'john.doe1@example.com', password: 'password123' });
    authToken = loginRes.body.token;
});
describe('BlogController', () => {
    describe('addComment', () => {
        it('should add a comment to a blog successfully', async () => {
            const res = await request(app)
                .post('/api/blog/6603f2400dda6d407958f000/comment')
                .send({ content: 'Test Comment Content' })
                .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.includes('Comment added successfully');
        });
    });
    // describe('Fail to add Comment', () => {
    //   it('should be Invalid user data', async () => {
    //     const res = await request(app)
    //       .post('/api/blog/6603f2400dda6d407958f000/comment')ç
    //       .send({ content: 'Test Comment Content' })
    //       .set('Authorization', `Beaer ${authToken}`);
    //     expect(res.status).to.equal(401);
    //     expect(res.body).to.have.property('message').that.includes('Invalid token');
    //   });
    // });
    describe('likeBlog', () => {
        it('should like a blog successfully', async () => {
            const res = await request(app)
                .post('/api/blog/6603f2400dda6d407958f000/like')
                .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.includes('Blog liked successfully');
        });
    });
    it("Should get Blogs", async () => {
        const res = await request(app).get('/api/blog');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').that.includes('Blogs retrieved successfully');
        expect(res.body).to.have.property('blogs').that.is.an('array');
    });
    it('should get a single blog by ID successfully', async () => {
        const res = await request(app).get('/api/blog/6603f2400dda6d407958f000');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').that.includes('Blog Retrieved successfully');
        expect(res.body).to.have.property('blog').that.is.an('object');
    });
});
