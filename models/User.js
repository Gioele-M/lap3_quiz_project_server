const db = require("../dbConfig/init");

// authorisation

module.exports = class User {

    constructor(data){
        this.id = data.id
        this.username = data.name
        this.email = data.email
        this.password = data.pass
    }

    static get all(){
        return new Promise(async (res, rej) =>{
            try{

                const result = await db.query('SELECT * FROM users;')
                const users = result.rows.map(a => ({ id: a.id, name: a.name }))
                console.log(users)
                res(users)

            }catch(err){
                rej('Error!' + err)
            }
        })
    }

    static create(username, email, password){
        return new Promise(async (resolve, reject) => {
            try {
                console.log(username)
                const result = await db.query('INSERT INTO users (name, email, pass) VALUES ($1, $2, $3) RETURNING *;', [ username, email, password ]);
                const user = new User(result.rows[0]);
                resolve(user)
            } catch (err) {
                reject(`Error creating user: ${err}`)
            }
        })
    }


    static findByUsername(username){
        console.log('username is ' + username)
        return new Promise (async (resolve, reject) => {
            try {
                console.log('username is ' + username)
                let userData = await db.query("SELECT * FROM users WHERE name = $1;", [ username ]);
                let user = new User(userData.rows[0]);
                console.log(user)
                resolve(user);
            } catch (err) {
                console.log(err)
                reject('User not found');
            };
        });
    };
 
    static findByEmail(email){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query('SELECT * FROM users WHERE email = $1;', [ email ]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }

     // DESTROY FOR USERNAME
     static destroy(username) {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await db.query(
              'DELETE FROM users WHERE name = $1 RETURNING *;',
              [username]
            )
            resolve('User was deleted')
          } catch (err) {
            reject('User could not be deleted')
            console.log(err)
          }
        })
      }

      // DESTROY FOR ID
    
//     static destroy(id) {
//     return new Promise(async (res, rej) => {
//       try {
//         await db.query("DELETE FROM users WHERE id = $1;", [id]);
//         res("User was deleted");
//       } catch (err) {
//         rej(`Error deleting user: ${err}`);
//       }
//     });
//   }


  //   destroy() {
  //     return new Promise(async (resolve, reject) => {
  //         try {
  //             await db.query('DELETE FROM users WHERE id = $1;', [this.id]);
  //             resolve('User was deleted!');
  //         } catch (err) {
  //             reject('User could not be deleted!');
  //         }
  //     });
  // }

    
}
