import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { fetchRecipes } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipes()
      .then(setRecipes)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>🥗 Pocket Recipes</Text>
          <Text style={styles.subtitle}>Discover something delicious</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable onPress={() => navigation.navigate('Favorites')}><Text style={styles.icon}>♥</Text></Pressable>
          <Pressable onPress={() => navigation.navigate('SettingsMenu')}><Text style={styles.icon}>☰</Text></Pressable>
        </View>
      </View>

      {loading ? <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 40 }} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={recipes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('Detail', { recipe: item })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.cuisine} • {item.difficulty}</Text>
              <Text style={styles.meta}>⭐ {item.rating} · {item.cookTimeMinutes} min</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7F3' },
  header: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 14, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 22, fontWeight: '800', color: '#1B5E20' },
  subtitle: { color: '#667264', marginTop: 2 },
  headerActions: { flexDirection: 'row', gap: 18 },
  icon: { fontSize: 28, color: '#2E7D32' },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 10, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  image: { width: 88, height: 88, borderRadius: 12, backgroundColor: '#E8EEE5' },
  cardBody: { flex: 1, marginLeft: 12 },
  name: { fontSize: 17, fontWeight: '700', color: '#263225' },
  meta: { color: '#6A7568', marginTop: 4 },
  chevron: { fontSize: 32, color: '#97A294', paddingHorizontal: 8 },
  error: { color: '#B00020', padding: 20, textAlign: 'center' },
});
