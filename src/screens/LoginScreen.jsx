import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { loadUser } from '../storage/localStorage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Login Error', 'Please enter both email and password.');
      return;
    }

    const savedUser = await loadUser();
    if (!savedUser || savedUser.email !== email.trim().toLowerCase() || savedUser.password !== password) {
      Alert.alert('Login Error', 'Invalid email or password.');
      return;
    }

    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.brand}>Pocket Recipes</Text>
        <Text style={styles.title}>Welcome back</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <Pressable style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Log In</Text></Pressable>
        <Pressable onPress={() => navigation.navigate('Signup')}><Text style={styles.link}>New here? Sign up</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F2', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#fff', padding: 24, borderRadius: 20, gap: 14, elevation: 3 },
  brand: { fontSize: 18, fontWeight: '700', color: '#2E7D32' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#CCD5C8', borderRadius: 12, padding: 14, backgroundColor: '#FAFCF9' },
  button: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  link: { color: '#2E7D32', textAlign: 'center', fontWeight: '600', marginTop: 4 },
});
