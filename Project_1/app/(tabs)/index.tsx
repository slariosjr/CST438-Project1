import { useEffect, createContext, useContext, useState } from 'react';
import { Image, Button, TextInput, Alert, useColorScheme, ColorSchemeName } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { addGame, addGameToUser, addUser, createDatabase, loginCheck, printAllTables, resetDB, user } from '@/lib/database';
import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { styles } from '@/lib/Style';
import React from 'react';
import UserContext, { UserProvider } from '@/app/userContext';


let db: SQLiteDatabase;

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme: ColorSchemeName = useColorScheme();
  const buttonColor = colorScheme === 'dark' ? "#ECEDEE" : "#11181C";
  const [isLoggedIn, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userContext = useContext(UserContext);
  if (!userContext) {
    console.log(`${UserProvider}`);
    throw new Error('UserContext must be used within a UserProvider' );
  }
  const { userID, setUser } = userContext;

  // Fake user data 
  const loadFakeData = async () => {
    let tmp: user = {
      username: "MOTUS",
      password: "PONENS",
    }
    let tmp1: user = {
      username: "e1",
      password: "2",
    }
    await addUser(db, tmp)
    await addUser(db, tmp1)
    let gameDummy: number[] = [
      991, 987, 26183, 13,
    ]
    gameDummy.forEach(async element => {
      await addGame(db, element);
    });
    await addGameToUser(db, gameDummy[0], 1);
    await addGameToUser(db, gameDummy[1], 1);
  }

  const checkLogin = async() => { 
    if(userID == -1|| userID === null) {
      setLogin(false);
    } else setLogin(true);
  }

  const createDB = async () => {
    await createDatabase();
    db = await openDatabaseAsync('app.db');
    await resetDB(db);
    await loadFakeData();
    await printAllTables(db);
  }

  useEffect(() => {
    checkLogin();
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
      console.log(id);
      await setUser(id);

      console.log(userID);
      Alert.alert(`Logged in with username: ${username}`);
    }

    // router.push('/(tabs)/home'); 
  };


  return (
    <>
    {/* @ts-ignore */}
    <UserProvider>
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
      {isLoggedIn? (<Button title="Log out?" onPress={() => {
        setUser(-1);
      }} />) : (<Button title="Login!" onPress={handleLogin} />)}
      


      <Button
        title="Create Account"
        onPress={() => router.push('/createAccount')}  // Navigate to Create Account screen
      />
    </ParallaxScrollView>
    </UserProvider>
    </>
  );
}