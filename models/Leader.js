const db = require('../dbConfig')

module.exports = class Leader {

    constructor(data){
        this.id = data.id
        this.username = data.username
        this.correct = data.correct
        this.total_quest = data.total_quest
        this.time = data.time

        this.percentage = data.correct / data.total_quest
    }

    static get all(){
        return new Promise(async (res, rej) =>{
            try{

                const result = await db.query('SELECT * FROM leaders;')
                const leaders = result.rows.map(a => ({ id: a.id, name: a.name }))
                console.log(leaders)
                res(leaders)

            }catch(err){
                rej('Error!' + err)
            }
        })

    }
   
    static findByUsername(data) {
        return new Promise(async (res, rej) => {
            try {
                const { username } = data;
                let result = await db.query(`SELECT * FROM leaders WHERE username = $1 ORDER BY username DESC;`, [
                    username,
                ]);
                let leaders = result.rows;
                res(leaders);
                } catch (err) {
                rej("Could not receive this user's scores");
                }
        });
    }
        // UPDATE --> TO BE UPDATED 
        // static update(id, correct, total_quest, time) {
        //     return new Promise (async (resolve, reject) => {
        //         try {
        //             let updatedUserData = await db.query('UPDATE users SET score = $2 WHERE id = $1 RETURNING *;', [ id, correct, total_quest, time ]);
        //             let updatedUser = new User(updatedUserData.rows[0]);
        //             resolve (updatedUser);
        //         } catch (err) {
        //             reject('Error updating User');
        //         }
        //     });
        // }
    
      static destroy(id){
            return new Promise(async (res, rej) => {
                try {
                    await db.query("DELETE FROM users WHERE id = $1;", [id]);
                    res('User was deleted')
                } catch (err) {
                    rej(`Error deleting user: ${err}`)
                }
            })
          }

        // LEADERBOARD
    // static get leaderboard () {
    //         return new Promise (async (resolve, reject) => {
    //             try {
    //                 let usersData = await db.query(`SELECT * FROM users ORDER BY SCORE DESC LIMIT 100;`);
    //                 const users = usersData.rows.map(u => new User(u))
    //                 resolve (users);
    //             } catch (err) {
    //                 reject('Error retrieving users');
    //             }
    //         });
    //     }


    // 
        // SCORE LIST 
    // static getScoreList (username) {
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             let usersData = await db.query(`SELECT * FROM users WHERE username = $1 ORDER BY SCORE DESC;`, [ username ]);
    //             const user = usersData.rows.map(u => new User(u))
    //             resolve (user);
    //         } catch (err) {
    //             reject('Error retrieving results');
    //         }
    //     });
    // }

        
    }



    // UPDATE
    // get new correct and total questions
    // query: select * From leaderboard where username = $1 -> interact w data

    // Otherwise

    // get user by username -> create user object -> add correct and total q -> delete user from table -> re-insert user with update values
