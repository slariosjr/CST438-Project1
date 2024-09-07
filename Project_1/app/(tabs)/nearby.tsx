import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { connectAlert, connection, requestPermBlue, scanNearby } from '@/lib/bluetooth';
import { useEffect, useState } from 'react';
import BluetoothSetupComp from '@/components/bluetooth/blueSetup';
import BluetoothConnections from '@/components/bluetooth/blueConnect';

// Honestly, I just don't know a better way to do this.. 
let bluetoothEnabled = false;


// To the person whos reading this for code review, 
// I type funny comment, because funny comment is memorable.

// "Okay imagine, a CS Boys love dating game"
// -  Alex~
export default function BluetoothScreen() {
  const [isConnected, setIsConnected] = useState(bluetoothEnabled);
  // Faker than Faker.js
  let data: connection[] = []
  useEffect(() => {
    setIsConnected(bluetoothEnabled);
    console.log("useEffect triggered");
    console.log("bluetoothEnabled:", bluetoothEnabled);
    console.log("isConnected:", isConnected);
    console.log("fakedata:", data);
  }, [bluetoothEnabled]);

  // Set the fucker up!
  const setupConnection = async (): Promise<boolean> => {
    bluetoothEnabled = await requestPermBlue();
    if (bluetoothEnabled) {
      console.log("BLUETOOTH YES!")
      setIsConnected(true);
      scanNearby();
    } else {
      console.log("BLUETOOTH NO!")
      setIsConnected(false);
    }
    return bluetoothEnabled;
  }

  return (
    // this was a fucking pain in my ass to set up, I rather shove a catcus up my ass. 
    // https://youtu.be/sJhtJaUQTg0?si=lMOvR7Bd1Une2GKi
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#007ce8', dark: '#004785' }}
      headerImage={<Ionicons size={310} name="bluetooth" style={styles.headerImage} />}>
      {!bluetoothEnabled && !isConnected && <BluetoothSetupComp setUpBluetoothConnection={setupConnection} style={styles} />}
      {bluetoothEnabled && isConnected && <>
        <ThemedText type="title">Available Connections</ThemedText>
        <ThemedText type="subtitle">Tap on them to connect!</ThemedText>
        <BluetoothConnections connections={data} connectAlert={connectAlert} style={styles}/>
      </>}
    </ParallaxScrollView>
  );
}

// Fuck CSS, me and zuck and finally agree on something as soon his lizard tongue stops licking my ear joe biden style. 
const styles = StyleSheet.create({
  headerImage: {
    color: '#00274a',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  ButtonContainer: {
    padding: 10,
  },
  Button: {
    color: '#00549e',
  }
});
