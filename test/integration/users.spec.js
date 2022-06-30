const app = require('../../server');
const port = process.env.PORT || 3000;
const resetTestDB = require ("./config")


describe("users endpoints", () => {
    let api;
    beforeEach(async () => {
      await resetTestDB();
    });
  
    beforeAll(async () => {
      api = app.listen(port, () =>
      console.log(`Test server running on port ${port}`)
      )});
  
    afterAll((done) => {
      console.log("Gracefully stopping test server");
      api.close(done);
    });


    // 

    it('should returns a user', async () => {
      const res = await request(api).get('/users/Adam10')
      expect(res.statusCode).toEqual(200);
      expect(res.body.username).toBe("Adam10");
  })
  
    // All users
    it("should return a list of all users in the database", async () => {
      const res = await request(api).get("/users");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(3);
    });





    
    it("Get leaderboard from users route", async () => {
      const res = await request(api).get("/users/leaderboard");
      expect(res.statusCode).toEqual(404);
      // expect(res.body.users[0].username).toEqual("Adam10");
    });






    
    // it("should return a list of all users in the database", async () => {
    //   const res = await request(api).get("/users/1");
    //   expect(res.statusCode).toEqual(200);
    //   expect(res.body.users.length).toEqual(3);
    // });

    // it("should create a new user", async () => {
    //   const res = await request(api).post("/users").send({
    //     name: 'Igor',
    //     email: 'igor@igor.com',
    //     pass: 'password'
    //   });
    //   expect(res.statusCode).toEqual(200);  
    //   expect(res.body.id).toEqual(8);
    // });

    // it("should delete a user", async () => {
    //   const res = await request(api).delete("/users/2");
    //   const res2 = await request(api).get("/users");
    //   expect(res.statusCode).toEqual(204);
  
    //   const userRes = await request(api).get("/users");
    //   expect(userRes.body.users.length).toBe(6);
    // });

    // Show user
  //   it('Show user by username', async ()=>{
  //     const res = await request(api).get(`/users/${userId}`)
  //     expect(res.body.id).toBe(userId)
  // })

    });
