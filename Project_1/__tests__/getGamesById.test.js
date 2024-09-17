import { getGamesById } from '@/lib/apiCalls';

test('grabs the game Super Mario Galaxy Rei: Zero by ID: 282825', async () => {
    const game = await getGamesById(282825);
    expect(game[0].name).toEqual('Super Mario Galaxy Rei: Zero');
});