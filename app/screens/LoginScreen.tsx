import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { loginUser } from '../services/authService';
import { useUser } from '../context/UserContext';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const data = await loginUser(email, password);
      if (!data) {
        throw new Error('User authentication failed');
      }

      setUser(data.user);
      Alert.alert('Success', `Welcome, ${data.user.name}!`);
      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
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
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  registerText: {
    color: '#007bff',
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;