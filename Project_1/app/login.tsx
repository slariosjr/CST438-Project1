
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';  // Use useRouter for navigation
import { styles } from '@/lib/Style';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const Login: React.FC = () => {
  const router = useRouter();  // useRouter to handle navigation

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    // login logic with the database
    if (username === 'user' && password === 'pass') {
      Alert.alert('Login Success!');
      router.push('/explore');  // Navigate to explore screen
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  const createAccount = () => {
    router.push('/createAccount');  // Navigate to Create Account screen
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Login</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Login"
        onPress={handleLogin}
      />
      <Button
        title="Create Account"
        onPress={createAccount}
      />
    </ThemedView>
  );
};

export default Login;
