import React, { useEffect, useState } from 'react';
import { TextInput, Button, Alert, ColorSchemeName, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';  // Use useRouter instead of navigation
import { addUser, user } from '@/lib/database';
import { SQLiteDatabase } from 'expo-sqlite';
import { styles } from '@/lib/Style';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getDB } from '@/lib/user';

let db: SQLiteDatabase;

export default function SignupScreen() {
  const router = useRouter();  // Using useRouter to navigate

  const colorScheme: ColorSchemeName = useColorScheme();
  const buttonColor = colorScheme === 'dark' ? "#ECEDEE" : "#11181C";
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [isLoggedIn, setLogin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const asyncFunc = async () => {
    // await checkLogin(userID, setLogin);
    db = await getDB();
  }

  useEffect(() => {

    asyncFunc();

  }, []);
  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    let newUser: user = {
      username: username,
      password: password,
    }
    addUser(db, newUser)
    Alert.alert('Account created successfully!');
    router.push('/(tabs)/');  // Navigate back to Login screen using router.push
  };

  return (
    <ThemedView style={styles.inputContainer}>
      <ThemedText style={styles.title}>Create Account</ThemedText>
      <TextInput
        style={styles.input}
        placeholderTextColor={buttonColor}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={buttonColor}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={buttonColor}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Create Account" onPress={handleSignup} />
    </ThemedView>
  );
}