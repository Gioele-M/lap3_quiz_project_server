DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL UNIQUE,
    email varchar(100) NOT NULL,
    pass varchar(100) NOT NULL
);


DROP TABLE IF EXISTS leader;

CREATE TABLE leader (
    name varchar(100) NOT NULL UNIQUE,
    correct int NOT NULL,
    total_quest int NOT NULL,
    time TIMESTAMP NOT NULL
);
