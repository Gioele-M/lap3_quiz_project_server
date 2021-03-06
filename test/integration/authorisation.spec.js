const app = require('../../server');
const resetTestDB = require ("./config")


describe('author endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('login returns user id', async () => {
        const res = await request(api).post('/auth/login').send({ "username": "Adam10", "password": "pass"})

        expect(res.body.user).toBe("Adam10");
    })

    it('register returns User created', async () => {
        const res = await request(api).post('/auth/register').send({"username": "Gioe", "email": "email@email.com", "password": "pass"})
        expect(res.body.msg).toBe("User created");
    })

    it('login with wrong data does not return id', async () => {
        const res = await request(api).post('/auth/login').send({"username": "Adam10", "password": "nopass"})
        expect(res.status).toBe(401);
    })

    it('Unsuccessful register for duplicate username', async () => {
        const res = await request(api).post('/auth/register').send({"username": "Adam10","email": "adams@gmail.com", "password": "nopass"})
        expect(JSON.stringify(res.body)).toContain('Error creating user: error: duplicate key value violates unique constraint');
    })

//     it('should return a list of books by a specific author', async () => {
//         const res = await request(api).get('/authors/1');
//         expect(res.statusCode).toEqual(200);
//         expect(res.body.books.length).toEqual(2);
//     })
})
