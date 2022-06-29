const User = require("../../../models/User");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig/init");

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with users on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await User.all;
      expect(all).toHaveLength(3);
    });
  });

  describe("constructor", () => {
    it("works", () => {
      const obj = new User("username", "email", "password");
      expect(obj.username).toBe(undefined);
      expect(obj.email).toBe(undefined);
      expect(obj.password).toBe(undefined);
    });
  });

  describe("create", () => {
    test("it resolves with new user on successful db query", async () => {
      let email = "fakeEmail@gmail.com";
      let query = `SELECT * FROM users WHERE email = 'fakeEmail@gmail.com';`;

      jest.spyOn(db, query).mockResolvedValueOnce({
        rows: [{ name: "ghost123", email, pass: "whatever" }],
      });

      let userData = {
        name: "test1234",
        email: "testEmail@gmail.com",
        pass: "password7",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [{ ...userData }],
      });
      const result = await User.create(userData);
      expect(result).toHaveProperty("name");
    });
  });

  describe("findByusername", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        name: "karma",
        email: "kaeramaa@gmail.com",
        pass: "password",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.findByUsername("karma");
      expect(result).toBeInstanceOf(User);
    });
  });

  describe("findByEmail", () => {
    test("it resolves with user on successful db query", async () => {
      let userData = {
        username: "karma",
        email: "test@gmail.com",
        pass: "testPassword1234",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [userData] });
      const result = await User.findByEmail("test@gmail.com");
      expect(result).toBeInstanceOf(User);
    });
  });

  describe("destroy", () => {
    test("it returns a string that says that user was deleted on a successful deletion query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce("User was deleted!");
      const result = await User.prototype.destroy();
      expect(result).toEqual("User was deleted");
    });
  });
});

// CREATE 
//    describe('create', () => {
//     test('it resolves with user on successful db query', async () => {
//         let userData = { id: 1, username: 'New User' }
//         jest.spyOn(db, 'query')
//             .mockResolvedValueOnce({rows: [ userData] });
//         const result = await User.create('New User');
//         expect(result).toBeInstanceOf(User)
//     })
// });





//     describe('books', () => {
//         test('it resolves with formatted books on successful db query', async () => {
//             jest.spyOn(db, 'query')
//                 .mockResolvedValueOnce({
//                     rows: [{id: 1, title: 'book1'}, {id: 2, title: 'book2'}]
//                 });
//             let testAuthor = new Author({ id: 1, name: 'Test Author'})
//             const books = await testAuthor.books;
//             expect(books).toHaveLength(2)
//             expect(books[0]).toHaveProperty('path', '/books/1')
//         })
//     });

//     describe('destroy', () => {
//         test('it resolves with message on successful db query', async () => {
//             jest.spyOn(db, 'query')
//                 .mockResolvedValueOnce({ id: 1 });
//             let testAuthor = new Author({ id: 1, name: 'Test Author'})
//             const result = await testAuthor.destroy();
//             expect(result).toBe('Author 1 was deleted')
//         })

//     describe('findOrCreateByName', () => {
//         test('it calls on Author.create if name not found', async () => {
//             let authorData = { id: 1, name: 'New Author' }
//             jest.spyOn(db, 'query')
//                 .mockResolvedValueOnce({rows: [ ] });
//             const createSpy = jest.spyOn(Author, 'create')
//                 .mockResolvedValueOnce(new Author(authorData));
//             const result = await Author.findOrCreateByName('New Author');
//             expect(createSpy).toHaveBeenCalled();
//             expect(result).toBeInstanceOf(Author);
//         })

//         test('it does not call on Author.create if name found', async () => {
//             let authorData = { id: 1, name: 'Old Author' }
//             jest.spyOn(db, 'query')
//                 .mockResolvedValueOnce({rows: [ authorData ] });
//             const createSpy = jest.spyOn(Author, 'create')
//                 .mockResolvedValueOnce(new Author(authorData));
//             const result = await Author.findOrCreateByName('Old Author');
//             expect(createSpy).not.toHaveBeenCalled();
//             expect(result).toBeInstanceOf(Author);
//         })
//     });

// })
