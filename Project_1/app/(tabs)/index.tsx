import React, { useState } from 'react';
import { View, Image, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';  

export default function HomeScreen() {
  const router = useRouter();  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Please enter both username and password.');
      return;
    }
    
    Alert.alert(`Logged in with username: ${username}`);

    //@ts-ignore
    router.push('/explore');  // Navigate to explore screen after successful login
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8100cc', dark: '#550087' }}
      headerImage={
        <Image
          source={require('@/assets/images/BundleLogox512x256.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedText type="title">Welcome to Bun-dle!</ThemedText>
      <ThemedView style={styles.titleContainer}>
        
        <HelloWave />
      </ThemedView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <Button title="Login!" onPress={handleLogin} />


      <Button
        title="Create Account"
        onPress={() => router.push('/createAccount')}  // Navigate to Create Account screen
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  reactLogo: {
    height: 160,
    width: 350,
    alignSelf: 'center', // This will center the logo horizontally // Ensure the logo takes up available space within the header
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
});
