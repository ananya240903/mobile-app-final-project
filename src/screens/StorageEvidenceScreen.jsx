import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { loadFavorites, loadSettings, loadUser } from '../storage/localStorage';

export default function StorageEvidenceScreen() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [settings, setSettings] = useState({ notificationsEnabled: false, darkMode: false });

  const refresh = useCallback(async () => {
    const [storedUser, storedFavorites, storedSettings] = await Promise.all([
      loadUser(),
      loadFavorites(),
      loadSettings(),
    ]);
    setUser(storedUser);
    setFavorites(storedFavorites);
    setSettings(storedSettings);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Persistence Evidence</Text>
        <Text style={styles.subtitle}>Front-end state read back from AsyncStorage</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Front-end view</Text>
          <Text style={styles.row}>Signed-in user: {user?.username || 'No saved user yet'}</Text>
          <Text style={styles.row}>Saved favorites: {favorites.length}</Text>
          {favorites.slice(0, 3).map((item) => (
            <Text key={item.id} style={styles.favorite}>♥ {item.name}</Text>
          ))}
          <Text style={styles.row}>Dark mode: {settings.darkMode ? 'ON' : 'OFF'}</Text>
          <Text style={styles.row}>Notifications preference: {settings.notificationsEnabled ? 'ON' : 'OFF'}</Text>
        </View>

        <View style={styles.storageCard}>
          <Text style={styles.sectionTitle}>AsyncStorage read-back</Text>
          <Text style={styles.code}>USER_KEY = {JSON.stringify(user)}</Text>
          <Text style={styles.code}>FAVORITES_KEY = {JSON.stringify(favorites.map((item) => ({ id: item.id, name: item.name })))}</Text>
          <Text style={styles.code}>SETTINGS_KEY = {JSON.stringify(settings)}</Text>
        </View>

        <Pressable style={styles.button} onPress={refresh}>
          <Text style={styles.buttonText}>Refresh Stored Data</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7F3' },
  content: { padding: 18, paddingBottom: 36 },
  title: { fontSize: 28, fontWeight: '800', color: '#1B5E20', marginTop: 8 },
  subtitle: { color: '#6A7568', marginTop: 4, marginBottom: 18 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 2 },
  storageCard: { backgroundColor: '#EAF4E7', borderRadius: 16, padding: 16, marginTop: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1B5E20', marginBottom: 10 },
  row: { color: '#263225', fontSize: 15, marginTop: 6 },
  favorite: { color: '#2E7D32', fontWeight: '700', marginTop: 6 },
  code: { color: '#324331', fontFamily: 'monospace', fontSize: 12, marginTop: 10, lineHeight: 18 },
  button: { backgroundColor: '#2E7D32', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 18 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
