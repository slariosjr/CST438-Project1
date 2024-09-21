import * as SQLite from 'expo-sqlite';

export type user = {
    username: string,
    password: string,
}

const dbIntializeSQLInstructions = `
    CREATE TABLE IF NOT EXISTS userInfo (
        userID INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(256) NOT NULL,
        password VARCHAR(256) NOT NULL,
        email VARCHAR(256),
        key VARCHAR(256)
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
    INSERT INTO userInfo (username, password) VALUES (?, ?)`;

const addGameSQLInstruction: string = `
    INSERT INTO game (gameID) VALUES (?)`;

const addGameToUserInstruction: string = `
    INSERT INTO userToGame (userID, gameID, dateAdded) VALUES (?, ?, ?)`;

const queryUserFromPasswordSQLInstruction: string = `
    SELECT * FROM userInfo WHERE password = ?;`;

const queryUserFromUserSQLInstruction: string = `
    SELECT * FROM userInfo WHERE username = ?;`;

const queryUserFromUserIDSQLInstruction: string = `
    SELECT * FROM userInfo WHERE userID = ?;`;

const queryUserFromLoginSQLInstruction: string = `
    SELECT * FROM userInfo WHERE username = ? AND password = ?;`;

const queryUserFromEmailSQLInstruction: string = `
    SELECT * FROM userInfo WHERE email = ?;`;

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
    SELECT COUNT(*) FROM userInfo WHERE password = ?`;

const queryAllGames: string = `
    SELECT * FROM game;`;

const queryAllUserInfo: string = `
    SELECT * FROM userInfo`;

const queryAllUserToGame: string = `
    SELECT * FROM userToGame`;

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

export const addUser = async (db: SQLite.SQLiteDatabase, userData: user): Promise<boolean> => {
    try {
        // Okay Check if username exists 
        const ifUserNameExists = await db.getFirstAsync(queryGameForUserSQLInstruction, [userData.username]);
        if (ifUserNameExists) return false;
        // Check if email exists
        // const ifEmailAlreadyExists = await db.getFirstAsync(queryUserFromEmailSQLInstruction, [userData.email]);
        // if (ifEmailAlreadyExists) return false;


        // Then finally insert
        await db.runAsync(addUserSQLInstruction, [userData.username, userData.password]);
        return true;
    } catch (error) {
        console.error(`Error in add user: ${error}`)
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

export const addGameToUser = async (db: SQLite.SQLiteDatabase, gameID: number, userID: number) => {
    // Get date
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    try {
        await db.runAsync(addGameToUserInstruction, [userID, gameID, formattedDate]);
    } catch (error) {
        console.error(`Error: ${error}`)
        throw error;
    }
}

export const removeUser = async (db: SQLite.SQLiteDatabase, password: string): Promise<boolean> => {
    try {
        // Check if account exists
        const user = await db.getFirstAsync(queryUserFromPasswordSQLInstruction, [password]);
        if (!user) return false;  // User not found

        // User found, remove using userID
        // @ts-ignore
        await db.runAsync(removeUserSQLInstruction, [user.username]);
        return true;
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

export const printAllTables = async (db: SQLite.SQLiteDatabase) => {
    try {
        console.log("Games Saved to DB: \n");
        const gameTable = await db.getAllAsync(queryAllGames)
        console.log(gameTable);
        console.log("Users Saved to DB: \n");
        const userInfoTable = await db.getAllAsync(queryAllUserInfo);
        console.log(userInfoTable);
        console.log("GamesToUsers Saved to DB: \n");
        const userToGamesTable = await db.getAllAsync(queryAllUserToGame);
        console.log(userToGamesTable)
    } catch (error) {
        console.error(`Error: ${error}`)
        throw error;
    }

}

export const loginCheck = async (db: SQLite.SQLiteDatabase, username: string, password: string):Promise<number> => {
    try {
        console.log(username);
        console.log(password);
        console.log(queryUserFromLoginSQLInstruction);
        const user = await db.getFirstAsync(queryUserFromLoginSQLInstruction, [username, password]);
        console.log(user);
        if (!user) return -1;  // User not found

        //@ts-ignore Again Typescript tantrum!
        return user.userID;
    } catch (error) {
        console.error(`Error: ${error}`)
        throw error;
    }
}

export const getUserData = async (db: SQLite.SQLiteDatabase, uID: number): Promise<any> => {
    const userData = await db.getFirstAsync(queryUserFromUserIDSQLInstruction, [uID]);
    return userData;
  };