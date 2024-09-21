import { useEffect, useState } from 'react';
import { Image, Button, TextInput, Alert, useColorScheme, ColorSchemeName } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { addGame, addGameToUser, addUser, createDatabase, loginCheck, printAllTables, resetDB, user } from '@/lib/database';
import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { styles } from '@/lib/Style';
import React = require('react');

let db: SQLiteDatabase;

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme: ColorSchemeName = useColorScheme();
  const buttonColor = colorScheme === 'dark' ? "#ECEDEE" : "#11181C";

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Fake user data 
  const loadFakeData = async () => {
    let tmp: user = {
      username: "MOTUS",
      password: "PONENS",
    }
    await addUser(db, tmp)
    let gameDummy: number[] = [
      991, 987, 26183, 13,
    ]
    gameDummy.forEach(async element => {
      await addGame(db, element);
    });
    await addGameToUser(db, gameDummy[0], 1);
    await addGameToUser(db, gameDummy[1], 1);
  }

  const createDB = async () => {
    await createDatabase();
    db = await openDatabaseAsync('app.db');
    await resetDB(db);
    await loadFakeData();
    await printAllTables(db);
  }

  useEffect(() => {
    createDB();

  }, []);

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Please enter both username and password.');
      return;
    }

    let id: number = await loginCheck(db, username, password);
    if (id == -1) {
      Alert.alert('Login Failed! Check your username and password!');
      return;
    } else {
      Alert.alert(`Logged in with username: ${username}`);
      // userData = getUserData(db, id);
    }

    router.push('/(tabs)/home');  // Navigate to explore screen after successful login
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
      <ThemedView style={styles.titleCenterContainer}>

        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={buttonColor}
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholderTextColor={buttonColor}
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </ThemedView>

      <Button title="Login!" onPress={handleLogin} />


      <Button
        title="Create Account"
        onPress={() => router.push('/createAccount')}  // Navigate to Create Account screen
      />
    </ParallaxScrollView>
  );
}