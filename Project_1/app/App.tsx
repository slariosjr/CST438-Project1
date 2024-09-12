// Import necessary modules
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/app/login';
import CreateAccount from '@/app/createAccount';
import HomeScreen from '@/app/(tabs)/index';  // Ensure HomeScreen is imported

// Define the types for each screen and the parameters they expect
export type RootStackParamList = {
  Login: undefined;           // Login screen doesn't expect any parameters
  CreateAccount: undefined;   // CreateAccount screen doesn't expect any parameters
  Home: undefined;            // Home screen doesn't expect any parameters
};

// Create the StackNavigator, passing in RootStackParamList as the type
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

