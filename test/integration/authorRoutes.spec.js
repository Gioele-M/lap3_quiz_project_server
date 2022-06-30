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
        const res = await request(api).post('/auth/login').send({"username": "Adam10","email": "adams@gmail.com", "password": "password"})
        expect(res.body.username).toBe("Adam10");
    })

    it('login with wrong data does not return id', async () => {
        const res = await request(api).post('/auth/login').send({"username": "Adam10","email": "adams@gmail.com", "password": "nopass"})
        expect(res.body.msg).toBe("Incorrect Username or Password");
    })

//     it('should return a list of books by a specific author', async () => {
//         const res = await request(api).get('/authors/1');
//         expect(res.statusCode).toEqual(200);
//         expect(res.body.books.length).toEqual(2);
//     })
})
