import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";
import { createDatabase, printAllTables } from "./database";

// Checking if logged in!
export const checkLogin = async (userID: number | null, state: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (userID === null || userID === -1) {
        await state(false);
    } else state(true);
}

// We need to get the database some how soo! 
export const getDB = async(): Promise<SQLiteDatabase> => {
    await createDatabase();
    const db = await openDatabaseAsync('app.db');
    await printAllTables(db);
    return db;
}