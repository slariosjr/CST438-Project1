import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, Alert, TouchableOpacity, View, ScrollView, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import GameDetailsComp from '@/components/gameDetailComp'

export default function GameDetailsScreen(route: RouteProp<ParamListBase>) {
  //if gameId is undefined return an empty object

  // Typescript throws a tantrum! 
  // @ts-ignore
  const { gameId, cover, gameName, gameStoryline, gameSummary } = useRoute().params ?? {};
  let compData: any = [gameId, cover, gameName, gameStoryline, gameSummary];
  // track if game is saved or not
  const [isSaved, setIsSaved] = useState(false);
  let navigation = useNavigation();

  const saveGame = () => {
    // toggle the saved state

    Alert.alert(isSaved ? `Unadded Game with Game ID: ${gameId}` : `Game Saved! With Game ID:${gameId}`);
    setIsSaved(!isSaved);
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="game-controller" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>

        {/* back button: ts-ignore because typescript throws a fit, Maybe pepper spray the typescript! (‾◡‾) */}
        {/*@ts-ignore*/}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ThemedText type="title" style={styles.headerTitle}>Game Details Page</ThemedText>
      </ThemedView>
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

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  headerTitle: {
    right: -45,
    top: -8,
  },
  backButton: {
    position: 'absolute',
    top: -18,
    left: -26,
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  }
});
