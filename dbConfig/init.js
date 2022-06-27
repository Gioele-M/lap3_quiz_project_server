const { Pool } = require("pg");

let config;


if(process.env.DATABASE_URL){config = {
			connectionString: process.env.DATABASE_URL,
			ssk: {
				rejectUnauthorized: false
			}
		}
	}

const pool = new Pool(config)

module.exports = pool;
