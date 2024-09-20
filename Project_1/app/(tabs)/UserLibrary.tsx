import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { createDatabase, addGame, addGameToUser, printAllTables } from '@/lib/database'; 
import { SQLiteAnyDatabase } from 'expo-sqlite/build/NativeStatement';

type Game = {
    gameID: number;
    name: string;
  };

const availableGames = [
  { gameID: 1, name: 'Game One' },
  { gameID: 2, name: 'Game Two' },
  { gameID: 3, name: 'Game Three' },

];


const UserLibrary = () => {
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
    try {
      
      const savedGames: Game[] = await db.getAllAsync(
        `SELECT g.* FROM userToGame ug INNER JOIN game g ON ug.gameID = g.gameID WHERE ug.userID = ?`,
        [1] 
      );
      setGames(savedGames);
    } catch (error) {
      console.error('Error fetching saved games:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleAddGame = async (gameID: number) => {
    try {
      await addGame(db, gameID); 
      await addGameToUser(db, gameID, 1); 
      Alert.alert('Game added successfully!');
      fetchSavedGames(); 
    } catch (error) {
      console.error('Error adding game:', error);
      Alert.alert('Failed to add game.');
    }
  };


  if (loading) {
    return <Text>Loading your games...</Text>;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Games</Text>
      <FlatList
        data={availableGames}
        keyExtractor={(item) => item.gameID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gameItem}
            onPress={() => handleAddGame(item.gameID)}
          >
            <Text style={styles.gameName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.title}>Your Library</Text>
      {games.length === 0 ? (
        <Text>No games added to your library yet.</Text>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.gameID.toString()}
          renderItem={({ item }) => (
            <View style={styles.gameContainer}>
              <Text style={styles.gameName}>{item.name || 'Unknown Game'}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gameItem: {
    padding: 10,
    backgroundColor: '#ddd',
    marginBottom: 10,
    borderRadius: 5,
  },
  gameContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  gameName: {
    fontSize: 18,
  },
});


export default UserLibrary;