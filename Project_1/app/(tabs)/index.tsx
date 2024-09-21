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
import { checkLogin, getDB } from '@/lib/user';


let db: SQLiteDatabase;
// After rewritting this, I know why webdevs are really grumpy!
// ☆*: .｡. o(≧▽≦)o .｡.:*☆

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
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { userID, setUser } = userContext;

  const asyncFunc = async () => {
    await checkLogin(userID, setLogin);
    db = await getDB();
  }

  useEffect(() => {
    console.log(userID);
    asyncFunc();
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
    }
    await setUser(id);
    setLogin(true);
    Alert.alert(`Logged in with username: ${username}`);

    router.push('/(tabs)/home');
  };


  return (
    <>
      {/* @ts-ignore */}
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#8100cc', dark: '#550087' }}
          headerImage={
            <Image
              source={require('@/assets/images/BundleLogox512x256.png')}
              style={styles.reactLogo}
            />
          }>
          <ThemedText type="title">Welcome to Bun-dle!</ThemedText>

          {isLoggedIn ? (<Button title="Log out?" color={"#eb4034"} onPress={async () => {
            await setUser(-1);
            checkLogin(userID, setLogin);
            setLogin(false);
            Alert.alert(`Logged out from: ${username}`);
          }} />) : (<>
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
          </>)}
          <Button
            title="Create Account"
            onPress={() => router.push('/createAccount')}  // Navigate to Create Account screen
          />
        </ParallaxScrollView>
    </>
  );
}