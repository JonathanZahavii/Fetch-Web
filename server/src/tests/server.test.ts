// import request from 'supertest';
// import app from '../app'; // Assuming app is exported in app.ts
// import mongoose from 'mongoose';

// beforeAll(async () => {
//   const mongoUri = 'your_mongo_test_uri';
//   await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe('Post and Comment API', () => {
//   // Write tests for posts and comments
//   it('should create a new post', async () => {
//     const newPost = {
//       creatingUserId: 'user1',
//       postId: 'post1',
//       caption: 'This is a new post',
//       picture: 'http://example.com/pic.jpg',
//       location: 'Location 1',
//       petName: 'Pet 1',
//       when: new Date(),
//     };

//     const response = await request(app)
//       .post('/api/posts/add')
//       .send(newPost);

//     expect(response.status).toBe(201);
//     expect(response.body).toMatchObject(newPost);
//   });
// });
