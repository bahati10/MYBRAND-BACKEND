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
describe('MessageController', () => {
    describe('sendmessage', () => {
        it('should send a message successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const messageData = {
                firstname: 'John',
                lastname: 'Doe',
                email: 'john.doe@example.com',
                message: 'Test message',
            };
            const res = yield request(app)
                .post('/api/send')
                .send(messageData);
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('message').that.includes('Message Sent successfully');
            expect(res.body).to.have.property('themessage').that.is.an('object');
        }));
    });
    describe('getMessages', () => {
        it('should get all messages successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request(app)
                .get('/api/messages')
                .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.includes('Messages Retrieved successfully');
            expect(res.body).to.have.property('theMessages').that.is.an('array');
        }));
    });
});
