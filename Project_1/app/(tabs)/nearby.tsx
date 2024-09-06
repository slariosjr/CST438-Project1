import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { requestPermBlue } from '@/lib/bluetooth';


let bluetoothEnable = false;

async function setUpBluetoothConnection() {
  console.log("Start of func");
  bluetoothEnable = await requestPermBlue();
  if(bluetoothEnable) {
    console.log("BLUETOOTH YES!")
  } else {
    console.log("BLUETOOTH NO!")
  }

}

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="bluetooth" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bluetooth Mode</ThemedText>
      </ThemedView>
      <ThemedText type="subtitle">Connect with nearby users to find games, which you share in common!</ThemedText>
      <ThemedText>Press the button to get started with bluetooth mode!</ThemedText>
      <Button title="Get Started" onPress={setUpBluetoothConnection} />
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
