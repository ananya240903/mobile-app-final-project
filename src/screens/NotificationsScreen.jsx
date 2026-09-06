import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { configureNotifications, triggerTestNotification } from '../services/notifications';

export default function NotificationsScreen() {
  const [permission, setPermission] = useState('Not configured');
  const [lastTest, setLastTest] = useState('No test notification triggered yet');

  const configure = async () => {
    try {
      const result = await configureNotifications(true);
      setPermission(result.status);
      Alert.alert('Notifications Configured', `Permission status: ${result.status}`);
    } catch (error) {
      Alert.alert('Notification Error', error.message);
    }
  };

  const test = async () => {
    try {
      const result = await triggerTestNotification(true);
      setLastTest(result.message);
      Alert.alert('Pocket Recipes', result.message);
    } catch (error) {
      Alert.alert('Notification Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Configure and test notification behavior</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Configuration status</Text>
        <Text style={styles.status}>{permission}</Text>
        <Pressable style={styles.primary} onPress={configure}>
          <Text style={styles.primaryText}>Configure Notifications</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={test}>
          <Text style={styles.secondaryText}>Trigger Test Notification</Text>
        </Pressable>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.resultTitle}>Latest notification test</Text>
        <Text style={styles.resultText}>{lastTest}</Text>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteTitle}>Expo Go compatibility</Text>
        <Text style={styles.noteText}>This screen uses an in-app test notification in Expo Go. The project service file also contains the native local-notification implementation for a development build.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7F3', padding: 18 },
  title: { fontSize: 28, fontWeight: '800', color: '#1B5E20', marginTop: 8 },
  subtitle: { color: '#6A7568', marginTop: 4, marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, elevation: 2 },
  label: { fontSize: 16, fontWeight: '700', color: '#263225' },
  status: { color: '#2E7D32', fontSize: 18, fontWeight: '800', marginTop: 6, marginBottom: 20 },
  primary: { backgroundColor: '#2E7D32', padding: 14, borderRadius: 12, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondary: { borderWidth: 1, borderColor: '#2E7D32', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  secondaryText: { color: '#2E7D32', fontWeight: '700' },
  resultCard: { backgroundColor: '#fff', padding: 16, borderRadius: 14, marginTop: 18, elevation: 1 },
  resultTitle: { fontWeight: '800', color: '#1B5E20' },
  resultText: { color: '#41513F', marginTop: 8, lineHeight: 20 },
  note: { backgroundColor: '#EAF4E7', padding: 16, borderRadius: 14, marginTop: 18 },
  noteTitle: { fontWeight: '800', color: '#1B5E20' },
  noteText: { color: '#41513F', marginTop: 6, lineHeight: 20 },
});
