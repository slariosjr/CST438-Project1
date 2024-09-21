import React, { useEffect, useState, useContext } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { openDatabaseAsync } from 'expo-sqlite';
import { createDatabase, addGame, addGameToUser, printAllTables, getGameInUser } from '@/lib/database';
import { SQLiteAnyDatabase } from 'expo-sqlite/build/NativeStatement';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/lib/Style'
import { router, useNavigation } from 'expo-router';
import UserContext, { UserProvider } from '@/app/userContext';
import { checkLogin, getDB } from '@/lib/user';
import { gameInfo, getGamesById, onGameImageClick } from '@/lib/apiCalls';
type Game = {
  gameID: number;
  name: string;
};


const userLibrary = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setLogin] = useState(false);
  //@ts-ignore
  const userContext = useContext(UserContext);
  if (!userContext) {
    console.log(`${UserProvider}`);
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { userID, setUser } = userContext;
  let db: SQLiteAnyDatabase;

  const asyncFunc = async () => {
    if (userID === null || userID === -1) {
      await setLogin(false);
    } else await setLogin(true);
    db = await getDB();
    if (userID === null || userID === -1) return;
    const result = await getGameInUser(db, userID);
    let gam:any = [];
    //@ts-ignore
    // const fetchedGames: gameInfo[] = await Promise.all(
    //   result.map(async (element: { gameID: number }) => await getGamesById(element.gameID))
    // );

    result.forEach(async element => {
      gam.push(await getGamesById(element.gameID) as never)
    });
    //@ts-ignore
    await setGames(gam);
    await setLoading(false);
  }

  useEffect(() => {
    asyncFunc();
    console.log(isLoggedIn);
    console.log(userID);
  }, []);

  let navigation = useNavigation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8100cc', dark: '#550087' }}
      headerImage={<Ionicons size={310} name="game-controller" style={styles.headerImage} />}
    >
      <ThemedText type="title">Your Library</ThemedText>
      {isLoggedIn ? (<>
        {loading ? (<ThemedText>Loading your games...</ThemedText>) : (
          <>
            {games.length === 0 ? (
              <ThemedText>No games added to your library yet.</ThemedText>
            ) : (
              <ScrollView contentContainerStyle={styles.gameList}>
                {/* for each game make it a clickable item with the game cover and the name */}
                {games.map((game: gameInfo) => (
                  <TouchableOpacity key={game.id} onPress={() => onGameImageClick(game, navigation, userID)}>
                    <ThemedView style={styles.gameItem}>
                      {game.cover?.url ? (
                        <Image
                          source={{ uri: `https:${game.cover.url}` }}
                          style={styles.gameIcon}
                          resizeMode="cover"
                        />
                      ) : (
                        <Image
                          source={{ uri: `https://static.thenounproject.com/png/11204-200.png` }}
                          style={styles.gameIcon}
                          resizeMode="cover"
                        />
                      )}
                      <ThemedText style={styles.gameTitle}>{game.name}</ThemedText>
                    </ThemedView>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </>
        )}
      </>) : (<>
        <ThemedText>Please log in...</ThemedText>
        <Button title="Login!" onPress={async () => {
          router.push("/(tabs)/")
        }} />
      </>
      )}
    </ParallaxScrollView>
  );
};


export default userLibrary;