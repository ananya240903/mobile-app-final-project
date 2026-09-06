import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { loadSettings, saveSettings } from '../storage/localStorage';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadSettings().then((settings) => {
      setDarkMode(Boolean(settings.darkMode));
      setNotificationsEnabled(Boolean(settings.notificationsEnabled));
    });
  }, []);

  const update = async (changes) => {
    const next = { darkMode, notificationsEnabled, ...changes };
    setDarkMode(next.darkMode);
    setNotificationsEnabled(next.notificationsEnabled);
    await saveSettings(next);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Personalize Pocket Recipes</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}><Text style={styles.label}>Dark mode preference</Text><Text style={styles.help}>Saved locally on your device</Text></View>
          <Switch value={darkMode} onValueChange={(value) => update({ darkMode: value })} />
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <View style={{ flex: 1 }}><Text style={styles.label}>Recipe notifications</Text><Text style={styles.help}>Remember notification preference</Text></View>
          <Switch value={notificationsEnabled} onValueChange={(value) => update({ notificationsEnabled: value })} />
        </View>
      </View>

      <View style={styles.storageCard}>
        <Text style={styles.storageTitle}>Local storage status</Text>
        <Text style={styles.storageText}>✓ Settings are persisted with AsyncStorage.</Text>
        <Text style={styles.storageText}>✓ Favorites are persisted with AsyncStorage.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7F3', padding: 18 },
  title: { fontSize: 28, fontWeight: '800', color: '#1B5E20', marginTop: 8 },
  subtitle: { color: '#6A7568', marginTop: 4, marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 8 },
  label: { fontSize: 17, fontWeight: '700', color: '#263225' },
  help: { color: '#6A7568', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#E5EAE2', marginVertical: 10 },
  storageCard: { marginTop: 18, backgroundColor: '#EAF4E7', borderRadius: 16, padding: 16 },
  storageTitle: { fontWeight: '800', color: '#1B5E20', fontSize: 16 },
  storageText: { color: '#41513F', marginTop: 8 },
});
