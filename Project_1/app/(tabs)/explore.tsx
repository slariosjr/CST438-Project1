import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const setUpAPIConnection = () => {
  console.log("The button works!");
  // make a function to Fetch API information, get it to show in the log 
  // need a loop to display all games, Icon & Title
}

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="game-controller" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">All Games</ThemedText>
      </ThemedView>
      <ThemedText>Here a full list of video games will be displayed!</ThemedText>
      <Button title="Access Games" onPress={setUpAPIConnection}/>
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
});
