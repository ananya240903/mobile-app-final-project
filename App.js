import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SettingsMenu from './src/components/SettingsMenu';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import StorageEvidenceScreen from './src/screens/StorageEvidenceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTintColor: '#1B5E20' }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Recipe Details' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites / Profile' }} />
        <Stack.Screen name="SettingsMenu" component={SettingsMenu} options={{ title: 'Menu' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="StorageEvidence" component={StorageEvidenceScreen} options={{ title: 'Persistence Evidence' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
