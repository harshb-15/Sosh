const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const Blog = require('./models/blog_model');
const blog1 = {
    title: 'Blog 2',
    description: 'Description 1',
};
describe('POST /api/blog', (done) =>
{
    dotenv.config({ path: './config.env' });
    const DB = process.env.DB_URL.replace(
        '<password>',
        process.env.DB_PASSWORD
    );
    mongoose.connect(DB).then(() => {
        console.log('Connected to Database');
    });
    console.log("Tests are running");
    it("Logged In Users Should create a new Blog", async () =>
    {
        const response = await request(app)
            .post('/api/blog')
            .set('Authorization', 'Bearer 12345678')
            .send(blog1);
        expect(response.statusCode).toBe(200);
        expect(response._body.created.title).toBe(blog1.title);
        expect(response._body.created.description).toBe(blog1.description);
    });
    it('Logged In Users Should edit a Blog', async () => {
        const response1 = await request(app)
            .post('/api/blog')
            .set('Authorization', 'Bearer 12345678')
            .send(blog1);
        const response2 = await request(app)
            .put('/api/blog')
            .set('Authorization', 'Bearer 12345678')
            .send({ id: response1._body.created._id, title: 'Changed Title' });
        await Blog.deleteMany({});
        expect(response2.statusCode).toBe(200);
        expect(response2._body.updated.title).toBe('Changed Title');
    });
    it('Logged In Users Should delete a Blog', async () => {
        const response1 = await request(app)
            .post('/api/blog')
            .set('Authorization', 'Bearer 12345678')
            .send(blog1);
        const response2 = await request(app)
            .delete('/api/blog')
            .set('Authorization', 'Bearer 12345678')
            .send({ id: response1._body.created._id });
        expect(response2.statusCode).toBe(200);
        expect(response2._body.deleted._id).toBe(response1._body.created._id);
    });
    it('Logged Out Users Should create a new Blog', async () => {
        const response = await request(app)
            .post('/api/blog')
            .send(blog1);
        expect(response.statusCode).toBe(200);
        expect(response._body.created.title).toBe(blog1.title);
        expect(response._body.created.description).toBe(blog1.description);
    });
    it('Logged out Users Should edit a Blog', async () => {
        const response1 = await request(app)
            .post('/api/blog')
            .send(blog1);
        const response2 = await request(app)
            .put('/api/blog')
            .send({ id: response1._body.created._id, title: 'Changed Title' });
        expect(response2.statusCode).toBe(200);
        expect(response2._body.updated.title).toBe('Changed Title');
    });
    it('Logged out Users Should delete a Blog', async () => {
        const response1 = await request(app)
            .post('/api/blog')
            .send(blog1);
        const response2 = await request(app)
            .delete('/api/blog')
            .set('Authorization', 'Bearer 12345678')
            .send({ id: response1._body.created._id });
        expect(response2.statusCode).toBe(200);
        expect(response2._body.deleted._id).toBe(response1._body.created._id);
    });
});
