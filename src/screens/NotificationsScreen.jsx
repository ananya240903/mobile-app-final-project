import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { configureNotifications, triggerTestNotification } from '../services/notifications';

export default function NotificationsScreen() {
  const [permission, setPermission] = useState('Not configured');

  const configure = async () => {
    try {
      const status = await configureNotifications();
      setPermission(status);
      Alert.alert('Notifications Configured', `Permission status: ${status}`);
    } catch (error) {
      Alert.alert('Notification Error', error.message);
    }
  };

  const test = async () => {
    try {
      await triggerTestNotification();
      Alert.alert('Test Sent', 'A local notification was triggered successfully.');
    } catch (error) {
      Alert.alert('Notification Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Configure and test local alerts</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Permission status</Text>
        <Text style={styles.status}>{permission}</Text>
        <Pressable style={styles.primary} onPress={configure}>
          <Text style={styles.primaryText}>Configure Notifications</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={test}>
          <Text style={styles.secondaryText}>Trigger Test Notification</Text>
        </Pressable>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteTitle}>Evidence tip</Text>
        <Text style={styles.noteText}>Take one screenshot after configuration and another when the Pocket Recipes notification appears.</Text>
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
  note: { backgroundColor: '#EAF4E7', padding: 16, borderRadius: 14, marginTop: 18 },
  noteTitle: { fontWeight: '800', color: '#1B5E20' },
  noteText: { color: '#41513F', marginTop: 6, lineHeight: 20 },
});
