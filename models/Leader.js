const db = require('../dbConfig/init')

module.exports = class Leader {

    constructor(data){
        this.id = data.id
        this.username = data.username
        this.correct = data.correct
        this.total_quest = data.total_quest
        this.time = data.time

        this.percentage = data.percentage
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
   
    static findByUsername(username) {
    return new Promise(async (res, rej) => {
        try {
            let result = await db.query("SELECT * FROM leader WHERE name = $1;", [username]);

            const user = {
                username: result.rows[0].name,
                correct: result.rows[0].correct,
                total: result.rows[0].total_quest
            }

            res(user);
            } catch (err) {
            rej("Could not receive this user's scores");
            }
    });
    }

    static addUserToBoard(username){
        return new Promise(async (res,rej)=>{
            try{
                let result = await db.query("INSERT INTO leader (name, correct, total_quest, time, percentage) VALUES ($1, 0, 0, '2008-01-01 00:00:01', 0);", [username])
                
                res(result)
            }catch(err){
                rej('Could not add user to leaderboard')
            }
        })
    }

    static updateUserScore(username, correct, total){
        return new Promise (async (resolve, reject) => {
            try {
                let thisUser = await this.findByUsername(username)

                const newCorrect = thisUser.correct + correct
                const newTotal = thisUser.total + total
                let newPercentage = newCorrect/newTotal

                if(newPercentage == NaN){
                    newPercentage = 0
                }

                let updateScore = await db.query(`UPDATE leader
                                    SET 
                                    correct = $1,
                                    total_quest = $2,
                                    percentage = $3
                                    WHERE name = $4
                                    RETURNING *;`, [ newCorrect, newTotal, newPercentage, username ])

                
                                
                let newScore = updateScore.rows[0]
                console.log('this is the new score')
                console.log(updateScore.rows[0])
                resolve(newScore);
            } catch (err) {
                reject('User not found');
            }
        });
    };
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
    
        static destroy(name){
            return new Promise(async (res, rej) => {
                try {
                    const response = await db.query("DELETE FROM leader WHERE name = $1;", [name]);
                    console.log(response)

                    if(response.rowCount == 0){
                        throw new Error('User does not exist')
                    }

                    res('User removed')
                } catch (err) {
                    rej(`Error deleting user: ${err}`)
                }
            })
          }

        static get leaderboard(){ 
            return new Promise (async (resolve, reject) => {
                try {
                    const result = await db.query(`SELECT name, correct, total_quest, percentage
                                                        FROM leader
                                                        ORDER BY percentage DESC
                                                        LIMIT 10;`)
                    
                    console.log(result.rows)
                    const users = result.rows.map(user => ({ username: user.name, correct: user.correct, total: user.total_quest, percentage: user.percentage }))
                    resolve(users);
                } catch (err) {
                    reject("Error retrieving users")
                }
            })
        };

    
 
        
    }



    // UPDATE
    // get new correct and total questions
    // query: select * From leaderboard where username = $1 -> interact w data

    // Otherwise

    // get user by username -> create user object -> add correct and total q -> delete user from table -> re-insert user with update values
