
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';  // Use useRouter for navigation

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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default Login;
