import { getGames, getGamesById } from '../../lib/apiCalls';

// Please save us Lil tecca! 
test('grabs the game Super Mario Galaxy Rei: Zero by ID: 282825', async () => {
    const game = await getGamesById(282825);
    expect(game[0].name).toEqual('Super Mario Galaxy Rei: Zero');
});

test('grabs the game Fallout: A Post Nuclear Role Playing Game by ID: 13', async () => {
    const game = await getGamesById(13);
    expect(game[0].name).toEqual('Fallout: A Post Nuclear Role Playing Game');
});

// I got black, I got white, what you want?
test('grabs the game Halo Wars: Definitive Edition by ID: 26183', async () => {
    const game = await getGamesById(26183);
    expect(game[0].name).toEqual('Halo Wars: Definitive Edition');
});

// Hop outside a ghost and hop in a phantom. 
test('grabs the game Halo 3 by ID: 987', async () => {
    const game = await getGamesById(987);
    expect(game[0].name).toEqual('Halo 3');
});

test('grabs the game Halo 4 by ID: 991', async () => {
    const game = await getGamesById(991);
    expect(game[0].name).toEqual('Halo 4');
});


test('grabs the Invalid game by ID: -1', async () => {
    const game = await getGamesById(-1);
    expect(game).toEqual([]);
});

test('Fetch group of games by search \"Super mario 64\"', async () => {
    const result = await getGames(2, 0, 'super mario 64');
    expect(result[0].name).toEqual('Super Mario 64');
    expect(result[1].name).toEqual('Super Mario 64 DS');
});

// I love unit testing broken code! 😁
test('Fetch a group of games by search \"super mayo bros 76, luigi\'s eye exam\"', async () => {
    const result = await getGames(100, 1, "super mayo bros 76, luigi\'s eye exam");
    expect(result).toEqual([]);
})
