import { expect } from 'chai';
import request from 'supertest';
import { app } from '../index.js';

let authTokenAdmin: string;
let authTokenUser: string;

before(async function() {

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

after(function() {
  process.exit()
})


describe('MessageController', () => {
  describe('sendmessage', () => {
    it('should send a message successfully', async () => {
      const messageData = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        message: 'Test message',
      };

      const res = await request(app)
        .post('/api/send')
        .send(messageData);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message').that.includes('Message Sent successfully');
      expect(res.body).to.have.property('themessage').that.is.an('object');
    });
  });

  describe('getMessages', () => {
    it('should get all messages successfully', async () => {
      const res = await request(app)
        .get('/api/messages')
        .set('Authorization', `Bearer ${authTokenAdmin}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message').that.includes('Messages Retrieved successfully');
      expect(res.body).to.have.property('theMessages').that.is.an('array');
    });
  });

  describe('getMessage', () => {
    it('should get message successfully', async () => {
      const res = await request(app)
        .get('/api/messages/6603c810d5f5bdd0f668189e')
        .set('Authorization', `Bearer ${authTokenAdmin}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message').that.includes('Message Retrieved successfully');
      expect(res.body).to.have.property('theMessage');
    });
  });

  describe('deleteMessage', () => {
    it('should delete message successfully', async () => {
      const res = await request(app)
        .delete('/api/messages/delete/660567a7994c83eba6dcde4c')
        .set('Authorization', `Bearer ${authTokenAdmin}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message').that.includes('Message Deleted successfully');
    });
  });
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
        image: 'https://images.unsplash.com/photo-1713036610632-8bd70bcfe597?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D',
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

after(async function() {
  const res = await request(app)
  .post('/api/blog/66056563021ca1042671ada8/like')
  .set('Authorization', `Bearer ${authTokenUser}`);
})



