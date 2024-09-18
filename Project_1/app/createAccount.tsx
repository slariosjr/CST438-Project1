import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';  // Use useRouter instead of navigation
import { createDatabase, printAllTables, addUser, user} from '@/lib/database';
import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';

let db: SQLiteDatabase; 

export default function SignupScreen() {
  const router = useRouter();  // Using useRouter to navigate

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const createDB = async () => {
    await createDatabase();
    db = await openDatabaseAsync('app.db');
    await printAllTables(db);
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
    router.push('/login');  // Navigate back to Login screen using router.push
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Create Account" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
