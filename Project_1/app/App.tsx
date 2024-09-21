import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from '@/app/createAccount';
import HomeScreen from '@/app/(tabs)/index';  // Ensure HomeScreen is imported
import UserContext, { UserProvider } from './userContext';

export type RootStackParamList = {
  Login: undefined;           
  CreateAccount: undefined;  
  Home: undefined;            
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    //@ts-ignore
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;

