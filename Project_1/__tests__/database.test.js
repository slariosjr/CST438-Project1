const { openDatabase } = require('expo-sqlite');
const {
  createDatabase,
  addUser,
  addGame,
  addGameToUser,
  removeUser,
  resetDB,
  loginCheck,
} = require('../database'); 


jest.mock('expo-sqlite', () => ({
  openDatabase: jest.fn(() => ({
    execAsync: jest.fn(),
    runAsync: jest.fn(),
    getFirstAsync: jest.fn(),
    getAllAsync: jest.fn(),
  })),
}));

describe('Database Functions', () => {
  let db;

  beforeAll(async () => {
    db = await openDatabase('test.db');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createDatabase should create tables', async () => {
    await createDatabase();
    expect(db.execAsync).toHaveBeenCalledWith(expect.any(String));
  });

  test('addUser should add a user if username does not exist', async () => {
    db.getFirstAsync.mockResolvedValueOnce(null); 
    const result = await addUser(db, { username: 'testuser', password: 'testpass' });
    expect(db.runAsync).toHaveBeenCalledWith(expect.any(String), ['testuser', 'testpass']);
    expect(result).toBe(true);
  });

  test('addUser should not add a user if username already exists', async () => {
    db.getFirstAsync.mockResolvedValueOnce({});
    const result = await addUser(db, { username: 'testuser', password: 'testpass' });
    expect(db.runAsync).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });

  test('addGame should add a game', async () => {
    await addGame(db, 1);
    expect(db.runAsync).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('addGameToUser should add a game to a user', async () => {
    await addGameToUser(db, 1, 1);
    expect(db.runAsync).toHaveBeenCalledWith(expect.any(String), [1, 1, expect.any(String)]);
  });

  test('removeUser should remove user if password matches', async () => {
    db.getFirstAsync.mockResolvedValueOnce({ username: 'testuser' }); 
    const result = await removeUser(db, 'testpass');
    expect(db.runAsync).toHaveBeenCalledWith(expect.any(String), ['testuser']);
    expect(result).toBe(true);
  });

  test('removeUser should not remove user if not found', async () => {
    db.getFirstAsync.mockResolvedValueOnce(null);
    const result = await removeUser(db, 'testpass');
    expect(db.runAsync).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });

  test('resetDB should drop and recreate tables', async () => {
    db.execAsync.mockResolvedValue(true);
    await resetDB(db);
    expect(db.execAsync).toHaveBeenCalledWith(expect.stringContaining('DROP TABLE'));
    expect(db.execAsync).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE'));
  });

  test('loginCheck should return userID if credentials are correct', async () => {
    db.getFirstAsync.mockResolvedValueOnce({ userID: 1 }); 
    const result = await loginCheck(db, 'testuser', 'testpass');
    expect(result).toBe(1);
  });

  test('loginCheck should return -1 if credentials are incorrect', async () => {
    db.getFirstAsync.mockResolvedValueOnce(null); 
    const result = await loginCheck(db, 'testuser', 'wrongpass');
    expect(result).toBe(-1);
  });
});