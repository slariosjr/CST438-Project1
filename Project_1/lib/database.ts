import * as SQLite from 'expo-sqlite';


// Create the beeeee minecraft beeee!~
const createDatabase = async (): Promise<void> => {
    const db: SQLite.SQLiteDatabase = await SQLite.openDatabaseAsync('app.db');

    // get the instructions
    const dbSQLInstructions = `
    -- This databse can be droped if needed
    drop database if exists local; 
    create database local; 
    use local; 

    create table userInfo(
        userID int primary key not null auto_increment, 
        username varchar(256) not null,
        email varchar(256) not null,
        passwordHash varchar(512) not null, 
    );

    create table game(
        gameID int primary key not null auto_increment,
    );

    create table userToGame(
        instanceID int primary key not null auto_increment, 
        userID int foreign key not null,
        gameID int foreign key not null,
        dateAdded date,
        rating int, 
    );`;

    await db.execAsync(dbSQLInstructions);
}
export default createDatabase; 
