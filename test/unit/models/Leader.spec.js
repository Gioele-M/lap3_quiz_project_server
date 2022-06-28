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
});
