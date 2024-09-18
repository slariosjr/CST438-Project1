import * as libDB from '@/lib/database';

describe('Database Unit Tests: ', () => {
    let db; 

    beforeAll(async () => {
        db = await libDB.createDatabase();
      });

    test('1: Database Connection', async() => {
        expect(db).not.toBe(null);
    })

    test('2: Database Table creation', () => {
        
    })
});