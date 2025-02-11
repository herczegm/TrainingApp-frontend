import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../services/authService';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [teamId, setTeamId] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !name ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await registerUser(email, password, name, teamId ? parseInt(teamId) : null);
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('Login'); // Navigálás vissza a LoginScreen-re
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An unknown error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Team ID"
        value={teamId}
        onChangeText={setTeamId}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Cancel"
        onPress={() => navigation.navigate('Login')} // Navigálás vissza a LoginScreen-re
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default RegisterScreen;
