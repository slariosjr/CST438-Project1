import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, Alert, TouchableOpacity, View, ScrollView, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';



export default function GameDetailsScreen({route, navigation}) {
  //if gameId is undefined return an empty object
  const {gameId} = useRoute().params ?? {}; 
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="game-controller" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Game Details Page</ThemedText>
        <Text>{gameId}</Text>
        <Button title="Save Game" />
      </ThemedView>
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
  gameIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  gameTitle: {
    fontSize: 18,
  },
});
