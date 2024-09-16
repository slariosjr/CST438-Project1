import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, Alert, TouchableOpacity, View, ScrollView, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { getGamesById } from '@/lib/apiCalls';


export default function GameDetailsScreen({route}) {
  //if gameId is undefined return an empty object

  // Typescript throws a tantrum over this.. 
  // @ts-ignore
  const {gameId, cover, gameName, gameStoryline, gameSummary} = useRoute().params ?? {}; 

  console.log(getGamesById(gameId));
  console.log(gameId, cover, gameName, gameStoryline, gameSummary);
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

    {/* back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ThemedText type="title" style={styles.headerTitle}>Game Details Page</ThemedText>
      </ThemedView>
        {/* Game Details */}
        <View>
            {cover? (
              <Image
                source={{ uri: `https:${cover}` }}
                style={styles.gameIcon}
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="image" size={50} color="#808080" />
            )}
            <ThemedText style={styles.gameTitle}>{gameName}</ThemedText>
            <ThemedText style={styles.gameInfo}>Game ID: {gameId}</ThemedText>
            <ThemedText style={styles.gameInfo}>Description: {gameSummary}</ThemedText>
            <ThemedText style={styles.gameInfo}>Storyline: {gameStoryline}</ThemedText>
          </View>
          {/* Save Button */}
        <Button 
            title={isSaved ? 'Unadd Game' : 'Add Game'} 
            onPress={saveGame}
            color={isSaved ? 'red' : 'green'}/>
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
  headerTitle:{
    right:-45,
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
  },
  gameIcon: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 8,
  },
  gameInfo:{
    fontSize: 12,
    textAlign: 'left',
    color: '#FFFFFF',
  },
  gameTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  }
});
