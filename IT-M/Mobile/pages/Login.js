import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Login = ({ navigation, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api.luckybunny.eu/api', {
        username,
        password,
      });
      onLogin(response.data.token, response.data.user);
      navigation.navigate('Welcome');
    } catch (error) {
      console.error("Kirjautuminen epäonnistui:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IT Support</Text>
      <TextInput
        style={styles.input}
        placeholder="Käyttäjätunnus"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Salasana"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Kirjaudu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
