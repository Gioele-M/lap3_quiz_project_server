const db = require('../dbConfig/init')


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
    
    // ADD NEW USER 
    //
    // static addUserData(data) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             let user = userScore;
    //             let newUser = new User(user.rows[0])
    //             resolve(newUser)
    //         } catch (err) {
    //             reject(`Error creating user: ${err}`)
    //         }
    //     })
    // }


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

    
}


// delete fn



