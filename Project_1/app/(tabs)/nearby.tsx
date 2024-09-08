import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useState } from 'react';
import SetupConnections from '@/components/localServer/SetupConnections';
import { useColorScheme } from '@/hooks/useColorScheme';


// Honestly, I just don't know a better way to do this.. 
let lookForConnect = false;


// To the person whos reading this for code review, 
// I type funny comment, because funny comment is memorable.

// "Okay imagine, a CS Boys love dating game"
// -  Alex~
export default function NearbyScreen() {
  const [listConnections, ableToConnect] = useState(lookForConnect);
  // Faker than Faker.js
  let data: any[] = []
  useEffect(() => {
    ableToConnect(lookForConnect);
    console.log("useEffect triggered");
    console.log("Currently looking for connections:", lookForConnect);
    console.log("isConnected:", listConnections);
    console.log("fakedata:", data);
  }, [lookForConnect]);

  // // Set the fucker up!
  const handleConnection = (): Promise<boolean> => {
    return new Promise<boolean>(() => {
      return false;
    });
  }
  const setUpConnections = () => {
    console.log("Setup Connections")
    lookForConnect = true;
    ableToConnect(true);
  }
  // }

  return (
    // this was a fucking pain in my ass to get working.. 
    // https://youtu.be/sJhtJaUQTg0?si=lMOvR7Bd1Une2GKi
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8370ff', dark: '#6047ff' }}
      headerImage={<Ionicons size={310} name="link" style={styles.headerImage} color={'#232323'} />}>
      {!lookForConnect && !listConnections &&
        <SetupConnections style={styles} startConnection={setUpConnections}/>
      }
      {lookForConnect && listConnections && <>
        <ThemedText type="title">Available Connections</ThemedText>
        <ThemedText type="subtitle">looking for connections</ThemedText>
      </>}
    </ParallaxScrollView>
  );
}

// Screw CSS, me and zuck finally agree on something. 
const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
    gap: 8,
  },
  buttonContainer: {
    padding: 10,
  },
  buttonLight: {
    color: '#8370ff',
  },
  buttonDark: {
    color: '#6047ff',
  }
});
