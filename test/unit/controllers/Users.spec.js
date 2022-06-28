const usersController = require("../../../controllers/users");
const User = require("../../../models/User");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("users controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns users with a 200 status code", async () => {
      let testUsers = ["user1", "user2", "user3", "user4"];
      jest.spyOn(User, "all", "get").mockResolvedValue(testUsers);
      await usersController.indexUsers(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testUsers);
    });
  });

  describe("getUser", () => {
    test("it returns a user with a 200 status code", async () => {
      jest
        .spyOn(User, "findByUsername")
        .mockResolvedValue(
          new User({ id: 1, email: "tree@gmail.com", pass: "fuwhfowauh" })
        );

      const mockReq = { params: { id: 1 } };
      await usersController.getUser(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
    });
  });

  //   describe("index", () => {
  //     test("it returns users with a 200 status code", async () => {
  //       let testUsers = ["user1", "user2", "user3", "user4"];
  //       jest.spyOn(User, "all", "get").mockResolvedValue(testUsers);
  //       await usersController.indexUsers(null, mockRes);
  //       expect(mockStatus).toHaveBeenCalledWith(200);
  //       expect(mockJson).toHaveBeenCalledWith(testUsers);
  //     });
  //   });

  //   describe("createNewUser", () => {
  //     test("it returns a new user with a status 201", async () => {
  //       let testUser = {
  //         // username: "iLike",
  //         email: "tree@gmail.com",
  //         pass: "fuwhfowauh",
  //       };
  //       jest.spyOn(User, "create").mockResolvedValue(new User(testUser));

  //       const mockReq = { body: testUser };
  //       await usersController.createNewUser(mockReq, mockRes);
  //       expect(mockStatus).toHaveBeenCalledWith(201);
  //       expect(mockJson).toHaveBeenCalledWith(new User(testUser));
  //     });
  //   });

  //   describe("destroy", () => {
  //     test("it returns a 204 status code on successful deletion", async () => {
  //       jest.spyOn(User.prototype, "destroy").mockResolvedValue("Deleted");

  //       const mockReq = { params: { id: 1 } };
  //       await usersController.destroy(mockReq, mockRes);
  //       expect(mockStatus).toHaveBeenCalledWith(204);
  //     });
  //   });
});
