import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, Alert, TouchableOpacity, View, ScrollView, Text, TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';

// API getGames Function 
type game= {
  id: number,
  cover: {
    id: Number,
    url: String
  },
  name: string
}
// Add data based on what you need



export default function TabTwoScreen() {
  // store the fetched games
  const [games, setGames] = useState([]);
  // keep track of offset of where we left off
  const [offset, setOffset] = useState(0); 
  // track the loading state
  const [loading, setLoading] = useState(false); 
  // see if more games are able to fetch
  const [hasMore, setHasMore] = useState(true); 
  // search state 
  const [search, setSearch] = useState('');

  // Function: fetch games and update state
  const fetchGames = useCallback(async (newSearch = '') => {
    if (loading || !hasMore) return;
    setLoading(true);
    // get 10 games at a time 
    const newGames = await getGames(10, offset, search); 
    setGames(prevGames => [...prevGames, ...newGames] as never);
    // save previous games 
    setOffset(prevOffset => prevOffset + 10); 
    if (newGames.length < 10) {
      // no more games able to fetch
      setHasMore(false); 
    }
    setLoading(false);
  }, [loading, hasMore, offset]);


  const getGames = async (limit: Number, offset: Number, toSearch: string) => {
    const URL = "https://api.igdb.com/v4/games/";
  
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': 'ydvyzcbct3xmsd2z1yqvygldviukst',
          'Authorization': 'Bearer rc2i6kl8y3gtscgcru9dgfyzrf7z2z',
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
  
  // fetch that immediately puts 10 games on the screen of the home page
  useEffect(() => {
    fetchGames();
  }, []); 

  // Function load more games button press with search
  const loadMoreGames = () => {
    fetchGames(search);
  };

  const handleSearch = () => {
    setGames([]);
    setOffset(0);
    setHasMore(true);
    fetchGames(search);
  }

  //navigation for going to a different screen 
  let navigation = useNavigation();
  
  // when game is clicked, bring user to a game details page with the game ID 
  const onGameImageClick = (game: game) => {
    console.log(JSON.stringify(game));
    Alert.alert(`Game Selected`, `You clicked on ${game.name} with game ID: ${game.id}`);
    // navigate to game details page

    // Type script is throwing a tantrum over this 
    // @ts-ignore
    navigation.navigate('gameDetails', {gameId:  game.id});
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="game-controller" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">All Games</ThemedText>
      </ThemedView>
    {/* Search Bar */}
    <View style={styles.searchContainer}>
      <TextInput
        style = {styles.searchInput}
        placeholder = "Search for a game!"
        value = {search}
        onChangeText = {setSearch}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>


      <ThemedText>Here a full list of video games will be displayed!</ThemedText>
      <ScrollView contentContainerStyle={styles.gameList}>
        {/* for each game make it a clickable item with the game cover and the name */}
        {games.map((game: game) => (
          <TouchableOpacity key={game.id} onPress={() => onGameImageClick(game)}>
            <View style={styles.gameItem}>
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
            </View>
          </TouchableOpacity>
        ))}
        {/* button checks if there is more games to show then loads more games */}
        {hasMore && (
          <Button title="Load More Games" onPress={loadMoreGames} disabled={loading} />
        )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    padding: 5,
    fontSize: 16,
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
    borderRadius: 8,
  },
  gameTitle: {
    fontSize: 18,
  },
  gameList: {
    padding: 10,
  },
});
