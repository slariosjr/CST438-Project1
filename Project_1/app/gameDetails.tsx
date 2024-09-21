import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Button, Alert} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import GameDetailsComp from '@/components/gameDetailComp'
import React from 'react';
import { createDatabase, printAllTables } from '@/lib/database';
import { openDatabaseAsync } from 'expo-sqlite';
import { styles } from '@/lib/Style';
import UserContext, { UserProvider } from '@/app/userContext';
let db;

export default function GameDetailsScreen(route: RouteProp<ParamListBase>) {
  //if gameId is undefined return an empty object

  // Typescript throws a tantrum! 
  // @ts-ignore
  const { gameId, cover, gameName, gameStoryline, gameSummary } = useRoute().params ?? {};
  let compData: any = [gameId, cover, gameName, gameStoryline, gameSummary];
  // track if game is saved or not
  const [isSaved, setIsSaved] = useState(false);
  
  let navigation = useNavigation();

  const createDB = async () => {
    await createDatabase();
    db = await openDatabaseAsync('app.db');
    await printAllTables(db);
  }

  useEffect(() => {
    checkLogin();
    createDB();
    
  }, []);
  
  const saveGame = () => {
    // toggle the saved state
    
    Alert.alert(isSaved ? `Unadded Game with Game ID: ${gameId}` : `Game Saved! With Game ID:${gameId}`);
    setIsSaved(!isSaved);
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="game-controller" style={styles.headerImage} />}>
      {/* Game Details */}
      <GameDetailsComp gameData={compData}/>
      {/* Save Button */}
      <Button
        title={isSaved ? 'Unadd Game' : 'Add Game'}
        onPress={saveGame}
        color={isSaved ? 'red' : 'green'} />
    </ParallaxScrollView>
  );
}