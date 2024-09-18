import * as SQLite from 'expo-sqlite';
import { sha256 } from 'react-native-sha256';

export type user = {
    username: string,
    email: string,
    password: string,
}

const dbIntializeSQLInstructions = `
    CREATE TABLE IF NOT EXISTS userInfo (
        userID INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(256) NOT NULL,
        email VARCHAR(256) NOT NULL,
        passwordHash VARCHAR(512) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS game (
        gameID INTEGER PRIMARY KEY
    );

    CREATE TABLE IF NOT EXISTS userToGame (
        instanceID INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER NOT NULL REFERENCES userInfo(userID) ON DELETE CASCADE ON UPDATE CASCADE,
        gameID INTEGER NOT NULL REFERENCES game(gameID) ON DELETE CASCADE ON UPDATE CASCADE,
        dateAdded DATE,
        rating INTEGER);`;

const dropSQLInstruction: string = `
    DROP TABLE IF EXISTS userInfo;
    DROP TABLE IF EXISTS game;
    DROP TABLE IF EXISTS userToGame;`;

const addUserSQLInstruction: string = `
    INSERT INTO userInfo (username, email, passwordHash) VALUES (?, ?, ?)`;

const addGameSQLInstruction: string = `
    INSERT INTO game (gameID) VALUES (?)`;

const addGameToUserInstruction: string = `
    INSERT INTO userToGame (userID, gameID, DATE) VALUES (?, ?, ?)`;

const queryUserFromUsernameSQLInstruction: string = `
    SELECT * FROM userInfo WHERE username = ?;`;

const queryUserFromPasswordSQLInstruction: string = `
    SELECT * FROM userInfo WHERE passwordHash = ?;`;

const queryUserFromEmailSQLInstruction: string = `
    SELECT * FROM userInfo WHERE passwordHash = ?;`;

const queryGameForUserSQLInstruction: string = `
    SELECT g.* FROM userToGame ug
    INNER JOIN game g ON ug.gameID = g.gameID
    WHERE ug.userID = ?;`;

const removeGameSQLInstruction: string = `
    DELETE FROM game WHERE gameID = ?;`;

const removeUserSQLInstruction: string = `
    DELETE FROM userInfo WHERE username = ?;`;

const removeGameFromUserSQLInstruction: string = `
    DELETE FROM userToGame WHERE userID = ? AND gameID = ?;`;

const checkIfUserExists: string = `
    SELECT COUNT(*) FROM userInfo WHERE passwordHash = ?`;


// Create the beeeee minecraft beeee!~
export const createDatabase = async (): Promise<void> => {
    let db: SQLite.SQLiteDatabase;
    try {
        db = await SQLite.openDatabaseAsync('app.db');
    } catch (error) {
        console.error(`Error at createDatabase: ${error}`);
        throw error;
    }
    // get the instructions


    await executeSQL(db, dbIntializeSQLInstructions);
}

const executeSQL = async (db: SQLite.SQLiteDatabase, sqlInstruction: string): Promise<boolean> => {
    try {
        await db.execAsync(sqlInstruction);
        return true;
    } catch (error) {
        console.error(`Error: ${error}`)
        throw error;
    }
}

export const addUser = async (db: SQLite.SQLiteDatabase, userData: user) => {
    const passhash: string = await sha256(userData.password);
    try {
        await db.runAsync(addUserSQLInstruction, [userData.username, userData.email, passhash]);
    } catch (error) {
        console.error(`Error: ${error}`)
        throw error;
    }
}

export const addGame = async (db: SQLite.SQLiteDatabase, gameID: number) => {
    try {
        await db.runAsync(addGameSQLInstruction, [gameID]);
    } catch (error) {
        console.error(`Error: ${error}`)
        throw error;
    }
}

export const removeUser = async (db: SQLite.SQLiteDatabase, username: string) => {
    try {

    } catch (error) {
        console.error(`Error: ${error}`)
        throw error;
    }
}

export const resetDB = async (db: SQLite.SQLiteDatabase) => {

    if (!await executeSQL(db, dropSQLInstruction)) {
        console.error("Error: Could not drop tables!");
        return;
    }
    if (!await executeSQL(db, dbIntializeSQLInstructions)) {
        console.error("Error: Could recreate tables!");
        return;
    }
}