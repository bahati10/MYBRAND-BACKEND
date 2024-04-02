var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { expect } from 'chai';
import request from 'supertest';
import { app } from '../index.js';
let authToken;
before(() => __awaiter(void 0, void 0, void 0, function* () {
    const loginRes = yield request(app)
        .post('/api/login')
        .send({ email: 'bahatisss123@gmail.com', password: 'bahatis@123' });
    authToken = loginRes.body.token;
}));
describe('BlogController', () => {
    describe('addComment', () => {
        it('should add a comment to a blog successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app)
                .post('/api/blog/6603f2400dda6d407958f000/comment')
                .send({ content: 'Test Comment Content' })
                .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.includes('Comment added successfully');
        }));
    });
    describe('Fail to add Comment', () => {
        it('should be Invalid user data', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app)
                .post('/api/blog/6603f2400dda6d407958f000/comment')
                .send({ content: 'Test Comment Content' })
                .set('Authorization', `Beaer ${authToken}`);
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('message').that.includes('Invalid token');
        }));
    });
    describe('likeBlog', () => {
        it('should like a blog successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app)
                .post('/api/blog/6603f2400dda6d407958f000/like')
                .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.includes('Blog liked successfully');
        }));
    });
    it("Should get Blogs", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).get('/api/blog');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').that.includes('Blogs retrieved successfully');
        expect(res.body).to.have.property('blogs').that.is.an('array');
    }));
    it('should get a single blog by ID successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app).get('/api/blog/6603f2400dda6d407958f000');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').that.includes('Blog Retrieved successfully');
        expect(res.body).to.have.property('blog').that.is.an('object');
    }));
});
