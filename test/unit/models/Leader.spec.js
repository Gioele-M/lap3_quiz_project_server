const Leader = require("../../../models/Leader");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");

describe.only("User", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test.only("it resolves with users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await Leader.all;
      expect(all).toHaveLength(3);
    });
  });

  describe("get leaderboard", () => {
    test.only("gets leaderboard with db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}] });
      const all = await Leader.leaderboard;
      expect(all).toHaveLength(2);
    });
  });

  describe("findByusername", () => {
    test("finds username on successful db query", async () => {
      let userData = {
        username: "karma",
        email: "kaeramaa@gmail.com",
        pass: "password",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await Leader.findByUsername("karma");
      expect(result).toBeInstanceOf(Array);
    });
  });

//   describe('updateUserScore', () => {
//     test('it returns a 200 status code and a message', async () => {
//         let testUser = {
//              username: 'Adam10', 
//              password: 'password', 
//           }
        
//         jest.spyOn(User, 'updateUserScore')
//             .mockResolvedValue(testUser); 
//         const mockReq = { body: { username: "Adam10", new_score: 10 } }
//         await controller.updateUserScore(mockReq, mockRes);
//         expect(mockStatus).toHaveBeenCalledWith(200);
//         expect(mockJson).toHaveBeenCalledWith({msg: `Update score of user Adam10: Successful`});
//     })
// });
  // describe('updateUserScore', () => {
  //   test('it resolves user with updated score', async () => {
  //       let userData = { username: 'Adam10', correct: 10, percentage: 0.5 }
  //       jest.spyOn(db, 'query')
  //           .mockResolvedValueOnce({rows: [ userData]});
  //       await User.findByUsername('Igor');
  //       const updateUserScore = await User.updateUserScore("Adam10",1);
  //       expect(updateUserScore).toBeInstanceOf(User);
  //       expect(updateUserScore).toHaveProperty("percentage", 1);
  //   })
  // });
});
