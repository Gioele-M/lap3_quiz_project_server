
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
  
    it("should return a list of all leaders in the database", async () => {
      const res = await request(api).get("/leaderboard");
      expect(res.statusCode).toEqual(200);
     expect(res.body.games.length).toEqual(3);
      
    });
  
  
    });
