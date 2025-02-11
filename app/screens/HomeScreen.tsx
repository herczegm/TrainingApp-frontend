import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useUser } from '../context/UserContext';

export default function HomeScreen({ navigation }: any) {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name || 'Guest'}!</Text>
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="View Teams" onPress={() => navigation.navigate('Teams')} />
      <Button title="Schedule Training" onPress={() => Alert.alert('Training', 'Navigate to Training screen')} />
      <Button title="View Events" onPress={() => navigation.navigate('Events')} />
      <Button title="Create Team" onPress={() => navigation.navigate('CreateTeam')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
