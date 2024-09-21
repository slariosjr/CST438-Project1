import React, { useEffect, useState, useContext } from 'react';
import { Button, FlatList, ScrollView, StyleSheet } from 'react-native';
import { openDatabaseAsync } from 'expo-sqlite';
import { createDatabase, addGame, addGameToUser, printAllTables } from '@/lib/database';
import { SQLiteAnyDatabase } from 'expo-sqlite/build/NativeStatement';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/lib/Style'
import { router } from 'expo-router';
import UserContext, { UserProvider } from '@/app/userContext';
type Game = {
  gameID: number;
  name: string;
};


const userLibrary = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setLogin] = useState(false);
  //@ts-ignore
  const userContext = useContext(UserContext);
  if (!userContext) {
    console.log(`${UserProvider}`);
    throw new Error('UserContext must be used within a UserProvider' );
  }
  const { userID, setUser } = userContext;
  let db: SQLiteAnyDatabase;

  const checkLogin = async() => { 
    console.log(userID);
    if(userID === null || userID === -1) {
      setLogin(false);
    } else setLogin(true);
  }

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await createDatabase();
        db = await openDatabaseAsync('app.db');
        await printAllTables(db);
        await fetchSavedGames();
      } catch (error) {
        console.error('Error initializing database:', error);
      }
      checkLogin();
    };


    initializeDatabase();
  }, []);


  const fetchSavedGames = async () => {

  };

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
                <FlatList
                  data={games}
                  keyExtractor={(item) => item.gameID.toString()}
                  renderItem={({ item }) => (
                    <ThemedView style={styles.gameItem}>
                      <ThemedText style={styles.gameTitle}>{item.name || 'Unknown Game'}</ThemedText>
                    </ThemedView>
                  )}
                />
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