import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";

// Gets games from the database, 

export type gameInfo = {
    id: number,
    cover: {
        id: Number,
        url: String
    },
    name: string
}

// API getGames Function 
// limit: Number, offset: Number, toSearch: string
export const getGames = async (limit: Number, offset: Number, toSearch: string) => {
    const URL = "https://api.igdb.com/v4/games/";

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'ydvyzcbct3xmsd2z1yqvygldviukst',
                'Authorization': 'Bearer j8w3mmd3jrpzjpvrbki8yrsrqciwt8',
            },
            body: `fields name, cover.url, summary, storyline;
            where cover.url != null & summary != null & storyline != null & name ~*"${toSearch}"*;  
            limit ${limit}; offset ${offset};`
        });

        const data = await response.json();
        // console.log(data); 
        return data;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
};


// when game is clicked, bring user to a game details page with the game ID 
export const onGameImageClick = (game: gameInfo,
    nav: NavigationProp<ReactNavigation.RootParamList>) => {
    console.log(JSON.stringify(game));
    Alert.alert(`Game Selected`, `You clicked on ${game.name} with game ID: ${game.id}`);
    // navigate to game details page

    // navigate to game details page with parameters
    const coverUrl = game.cover && game.cover.url ? game.cover.url : 'https://static.thenounproject.com/png/11204-200.png';

    // Type script is throwing a tantrum over this 
    // @ts-ignore
    nav.navigate('gameDetails', { gameId: game.id, cover: coverUrl, gameName: game.name, gameStoryline: game.storyline, gameSummary: game.summary });
};


// Get the game by ID
export const getGamesById = async (id: Number) => {
    const URL = "https://api.igdb.com/v4/games/";
    console.log(id);

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'ydvyzcbct3xmsd2z1yqvygldviukst',
                'Authorization': 'Bearer j8w3mmd3jrpzjpvrbki8yrsrqciwt8',
            },
            body: `fields name, cover.url, summary, storyline;
            where id = ${id};`,
        });

        if (!response.ok) {
            throw new Error(`Error fetching game: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching game:', error);
        throw error; // Re-throw the error for handling in calling code
    }
};