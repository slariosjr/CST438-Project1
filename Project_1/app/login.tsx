
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Alert } from 'react-native';

const Login: React.FC = () => { 
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {

    // login logic with the database
    if (username === 'user' && password === 'pass') {
      Alert.alert('Login Success!');
    } else {
      Alert.alert('Invalid credentials');
    }
    console.log('Login attempt with:', username, password);
    // authenticate the user here
  };
  const createAccount =() =>{
        console.log('Create account');
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
        title="Log In"
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
    marginTop: 20
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
