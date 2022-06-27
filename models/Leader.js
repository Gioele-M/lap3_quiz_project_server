const db = require('../dbConfig')

module.exports = class Leader {

    constructor(data){
        this.username = data.username
        this.correct = data.correct
        this.total_quest = data.total_quest
        this.time = data.time
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

        
    }
