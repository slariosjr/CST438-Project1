import Ionicons from '@expo/vector-icons/Ionicons';
import {Image, Button, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { styles } from '@/lib/Style';
// Just abstracting out code.. 
import { getGames, onGameImageClick, gameInfo, getGamesById} from '@/lib/apiCalls';
import React from 'react';

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
  const fetchGames = async (search = '') => {
    console.log("Fetch game called!")
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newGames = await getGames(10, games.length, search.toLowerCase()); // Get 10 games at a time
      setGames(prevGames => [...prevGames, ...newGames] as never);
      setHasMore(newGames.length === 10); // Check if more games are available
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchGames = async (search = '') => {
    console.log("Fetch game called!")
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newGames = await getGames(10, 0, search.toLowerCase()); // Get 10 games at a time
      setGames(prevGames => [...prevGames, ...newGames] as never);
      setHasMore(newGames.length === 10); // Check if more games are available
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  }
  
  // fetch that immediately puts 10 games on the screen of the home page
  useEffect(() => {
    fetchGames();
    
  }, []); 

  // Function load more games button press with search
  const loadMoreGames = () => {
    fetchGames(search.toLowerCase());
  };

  const handleSearch = () => {
    setGames([]);
    setOffset(0);
    setHasMore(true);
    searchGames(search.toLowerCase());
  }

  //navigation for going to a different screen 
  let navigation = useNavigation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8100cc', dark: '#550087' }}
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
      <ScrollView contentContainerStyle={styles.gameList}>
        {/* for each game make it a clickable item with the game cover and the name */}
        {games.map((game: gameInfo) => (
          <TouchableOpacity key={game.id} onPress={() => onGameImageClick(game, navigation)}>
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