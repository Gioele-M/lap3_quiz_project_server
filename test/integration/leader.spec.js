const app = require('../../server');
const port = process.env.PORT || 3000;
const resetTestDB = require ("./config")


describe("Leader endpoints", () => {
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

    // Leaderboard
    it("should return a list of all leaders in the database", async () => {
      const res = await request(api).get("/leaderboard");
      expect(res.statusCode).toEqual(200);
     expect(res.body.length).toEqual(3);
      
    });

    // Post user to leaderboard

    it('should post user to the leaderboard', async () => {
      const res = await request(api).post('/leaderboard/new').send({ "username": "Gioel"})
      expect(res.body.msg).toBe("User added");
  })
  

  // Delete user from leaderboard

    it('should post user to the leaderboard', async () => {
    const res = await request(api).delete('/leaderboard/remove').send({ "username": "Gioel"})
    expect(res.status).toBe(404);
})

//     it("Deletes user based on user ID", async()=>{  
//     const res = await request(api).delete(`/leaderboard/${userId}`)
//     expect(res.status).toBe(204)
// });
  
    });
