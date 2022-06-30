const leadersController = require("../../../controllers/Leader");
const leader = require("../../../models/Leader");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));
const mockRes = { status: mockStatus };

describe("Leader controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("leaderboard", () => {
    test("it returns Leaderboard with a 200 status code", async () => {
      let testPoints = ["h1", "60%"];
      jest.spyOn(leader, "leaderboard", "get").mockResolvedValue(testPoints);
      await leadersController.leaderboard(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testPoints);
    });

    test("not found error, return status code 404", async () => {
      jest
        .spyOn(leader, "leaderboard", "get")
        .mockRejectedValueOnce(new Error());
      await leadersController.leaderboard(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect.objectContaining({ success: false });
    });
  });

  describe("update", () => {
    test("update should throw a 422 error", async () => {
      let testUpdate = {
        username: "Adam10",
        correct: 5,
        total: 10,
        percentage: 0.5,
      };
      jest.spyOn(leader, "updateUserScore").mockResolvedValue(testUpdate);
      const mockReq = { params: { username: "Adam10" } };
      await leadersController.updateScore(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(422);
    });
  });

  describe("addUserToBoard", () => {
    test("adds user to the leaderboard with status 200", async () => {
      let testUser = {
        username: "twang",
      };

      jest
        .spyOn(leader, "addUserToBoard")
        .mockResolvedValue(new leader(testUser));

      const mockReq = { body: testUser };
      await leadersController.addUserToBoard(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledWith({ msg: "User added" });
    });

    // test("it returns a status code of 404", async () => {
    //   let testHabit = {
    //     id: 1,
    //     user_id: 1,
    //     habit_name: "drinking 1,5 l water",
    //     start_date: "2022-06-05",
    //     completed_dates: 0,
    //     streak: 0,
    //   };
    //   const mockReq = { body: testHabit };
    //   jest.spyOn(Habit, "create").mockRejectedValueOnce(new Error());
    //   await habitsController.create(mockReq, mockRes);
    //   expect(mockStatus).toHaveBeenCalledWith(400);
    //   expect.objectContaining({ success: false });
    // });
  });
});
