import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function SettingsMenu({ navigation }) {
  const items = [
    { label: 'App Settings', screen: 'Settings' },
    { label: 'Notifications', screen: 'Notifications' },
    { label: 'Favorites / Profile', screen: 'Favorites' },
    { label: 'Back to Home', screen: 'Home' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings Menu</Text>
      <Text style={styles.subtitle}>Choose an option</Text>
      <View style={styles.list}>
        {items.map((item) => (
          <Pressable key={item.label} style={styles.item} onPress={() => navigation.navigate(item.screen)}>
            <Text style={styles.itemText}>{item.label}</Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7F3', padding: 18 },
  title: { fontSize: 28, fontWeight: '800', color: '#1B5E20', marginTop: 8 },
  subtitle: { color: '#6A7568', marginTop: 4, marginBottom: 20 },
  list: { gap: 12 },
  item: { backgroundColor: '#fff', borderRadius: 14, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  itemText: { fontSize: 17, fontWeight: '700', color: '#263225' },
  arrow: { fontSize: 28, color: '#2E7D32' },
});
