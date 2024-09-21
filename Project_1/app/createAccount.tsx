import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ColorSchemeName, useColorScheme} from 'react-native';
import { useRouter } from 'expo-router';  // Use useRouter instead of navigation
import { createDatabase, printAllTables, addUser, user} from '@/lib/database';
import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import { styles } from '@/lib/Style';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

let db: SQLiteDatabase; 

export default function SignupScreen() {
  const router = useRouter();  // Using useRouter to navigate

  const colorScheme: ColorSchemeName = useColorScheme();
  const buttonColor = colorScheme === 'dark' ? "#d085ed" : "#9d34c7";//light purple color and dark purple for buttons
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const createDB = async () => {
    await createDatabase();
    db = await openDatabaseAsync('app.db');
    await printAllTables(db);//connects to database
  }

  useEffect(() => {
    createDB();
    
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
    router.back();  // Navigate back to Login screen using router.push
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