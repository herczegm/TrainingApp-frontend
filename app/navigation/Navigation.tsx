import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TeamsScreen from '../screens/TeamsScreen';
import EventsScreen from '../screens/EventsScreen';
import CreateTeamScreen from '../screens/CreateTeamScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Teams" component={TeamsScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
