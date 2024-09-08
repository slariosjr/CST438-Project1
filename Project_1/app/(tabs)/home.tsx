import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, Alert, TouchableOpacity, View, ScrollView, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

const LIMIT = 25;

const getGames = async () => {
  const URL = "https://api.igdb.com/v4/games/";

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'ydvyzcbct3xmsd2z1yqvygldviukst',
        'Authorization': 'Bearer rc2i6kl8y3gtscgcru9dgfyzrf7z2z',
      },
      body: "fields name, cover.url;"
    });

    const data = await response.json();
    console.log(data); // log the data
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);  
  }
};


export default function TabTwoScreen() {
  const [games, setGames] = useState([]); //store fetched games
  const setUpAPIConnection = async () => {
    console.log("Getting games");
    const fetchedGames = await getGames();
    setGames(fetchedGames);
  };

  const onGameImageClick = (game) => {
    Alert.alert(`Game Selected`, `You clicked on ${game.name}`);
    //navigate to game details page? 
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="game-controller" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">All Games</ThemedText>
      </ThemedView>
      <ThemedText>Here a full list of video games will be displayed!</ThemedText>
      <Button title="Access Games" onPress={setUpAPIConnection}/>

      <ScrollView contentContainerStyle={styles.gameList}>
        {games.map((game) =>(
          <TouchableOpacity key={game.id} onPress={() => onGameImageClick(game)}>
            <View style={styles.gameItem}>
              {game.cover?.url ? (
                <Image source = {{ uri: `https:${game.cover.url}`}}
                style={styles.gameIcon}
                resizeMode="cover" />) : (<Ionicons name="image" size={50} color="#808080" />)} 
                {/* if there's no cover url then just put the placeholder image icon  */}
              <Text style={styles.gameTitle}>{game.name}</Text>
            </View>
          </TouchableOpacity>
          
        ))}
        
      </ScrollView>
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  gameIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  gameTitle: {
    fontSize: 18,
  },
  gameList: {
    padding: 10,
  },
});
