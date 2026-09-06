import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { saveUser } from '../storage/localStorage';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Signup Error', 'Please enter username, email, and password.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Signup Error', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Signup Error', 'Password must be at least 6 characters.');
      return;
    }

    await saveUser({ username: username.trim(), email: email.trim().toLowerCase(), password });
    Alert.alert('Account Created', 'Registration successful. Please log in.', [
      { text: 'OK', onPress: () => navigation.replace('Login') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.brand}>Pocket Recipes</Text>
        <Text style={styles.title}>Create account</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <Pressable style={styles.button} onPress={handleSignup}><Text style={styles.buttonText}>Sign Up</Text></Pressable>
        <Pressable onPress={() => navigation.navigate('Login')}><Text style={styles.link}>Already have an account? Log in</Text></Pressable>
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
