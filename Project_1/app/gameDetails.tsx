import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import GameDetailsComp from '@/components/gameDetailComp'
import React from 'react';
import { styles } from '@/lib/Style';
import UserContext, { UserProvider } from '@/app/userContext';
import { checkLogin, getDB } from '@/lib/user';
import { addGame, addGameToUser, checkIfGameInUser, removeGame, removeGameFromUser } from '@/lib/database';
import { SQLiteDatabase } from 'expo-sqlite';
let db: SQLiteDatabase;

export default function GameDetailsScreen(route: RouteProp<ParamListBase>) {
  //if gameId is undefined return an empty object

  // Typescript throws a tantrum! 
  // @ts-ignore
  const { gameId, cover, gameName, gameStoryline, gameSummary, userID } = useRoute().params ?? {};
  console.log(userID)
  let compData: any = [gameId, cover, gameName, gameStoryline, gameSummary];
  // track if game is saved or not
  const [isSaved, setIsSaved] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);

  let navigation = useNavigation();

  const asyncFunc = async () => {
    await checkLogin(userID, setLogin);
    db = await getDB();
    if(await checkIfGameInUser(db, userID, gameId) == null) setIsSaved(false);
    else setIsSaved(true);
  }

  useEffect(() => {
    asyncFunc();

  }, [isLoggedIn, isSaved]);

  const saveGame = async() => {
    // toggle the saved state
    if(await checkIfGameInUser(db, userID, gameId) == null) console.log("Yeah its not tied to this user.")
    if(isSaved) {
      Alert.alert(`Unadded Game with Game ID: ${gameId}`);
      await removeGame(db, gameId);
      await removeGameFromUser(db, userID, gameId);
      setIsSaved(false);
      return;
    }

    Alert.alert(`Game Saved! With Game ID:${gameId}`);
    addGame(db, gameId);
    addGameToUser(db, gameId, userID);
    setIsSaved(true);
  };
  return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={<Ionicons size={310} name="game-controller" style={styles.headerImage} />}>
        {/* Game Details */}
        <GameDetailsComp gameData={compData} />
        {/* Save Button */}
        <Button
          title={isSaved ? 'Unadd Game' : 'Add Game'}
          onPress={saveGame}
          color={isSaved ? 'red' : 'green'} />
      </ParallaxScrollView>
  );
}