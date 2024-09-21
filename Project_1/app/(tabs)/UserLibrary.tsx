import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { openDatabaseAsync } from 'expo-sqlite';
import { createDatabase, addGame, addGameToUser, printAllTables } from '@/lib/database'; 
import { SQLiteAnyDatabase } from 'expo-sqlite/build/NativeStatement';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Ionicons } from '@expo/vector-icons';
import {styles} from '@/lib/Style' 

type Game = {
    gameID: number;
    name: string;
  };


const userLibrary = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  let db: SQLiteAnyDatabase;


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
    };


    initializeDatabase();
  }, []);


  const fetchSavedGames = async () => {
    
  };


  if (loading) {
    return <ThemedText>Loading your games...</ThemedText>;
  }


  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#8100cc', dark: '#550087' }}
      headerImage={<Ionicons size={310} name="game-controller" style={styles.headerImage} />}>
      <ThemedText type='title'>Your Library</ThemedText>
      {games.length === 0 ? (
        <ThemedText>No games added to your library yet.</ThemedText>
      ) : (
        <ScrollView contentContainerStyle={styles.gameList}
          data={games}
          keyExtractor={(item) => item.gameID.toString()}
          renderItem={({ item }) => (
            <ThemedView style={styles.gameItem}>
              <ThemedText style={styles.gameTitle}>{item.name || 'Unknown Game'}</ThemedText>
            </ThemedView>
          )}
        />
      )}
    </ParallaxScrollView>
  );
};


export default userLibrary;