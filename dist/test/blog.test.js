// import app from '../index.js';
// import { db } from '../config/db.config.js';
// import 'chai-http';
// import * as chai from 'chai';
// import chaiHttp from 'chai-http';
export {};
// chai.use(chaiHttp);
// const expect = chai.expect;
// describe('Blog Routes', () => {
//     before(async () => {
//         await db;
//     });
//     describe('POST /api/addblog', () => {
//         it('should add a new blog', (done) => {
//             const newBlog = {
//                 image: 'test_image_url',
//                 title: 'Test Blog',
//                 subtitle: 'Test Subtitle',
//                 content: 'Test Content',
//             };
//             chai.request(app)
//                 .post('/api/addblog')
//                 .send(newBlog)
//                 .end((err, res) => {
//                     expect(res).to.have.status(201);
//                     expect(res.body).to.have.property('message').to.equal('Blog Added successfully');
//                     expect(res.body).to.have.property('blog');
//                     done();
//                 });
//         });
//     });
// });
