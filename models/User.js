const db = require('../dbConfig/init')


// authorisation 

module.exports = class User {

    constructor(data){
        this.username = data.username
        this.email = data.email
        this.password = data.password
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


}
