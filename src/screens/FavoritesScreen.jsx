import React, { useCallback, useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadFavorites } from '../storage/localStorage';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites().then(setFavorites);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>Recipes saved on this device</Text>
      {favorites.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyText}>No favorites yet. Tap ♡ on a recipe detail screen.</Text></View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => navigation.navigate('Detail', { recipe: item })}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>{item.cuisine} • ⭐ {item.rating}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7F3', paddingTop: 12 },
  title: { fontSize: 28, fontWeight: '800', paddingHorizontal: 18, color: '#1B5E20' },
  subtitle: { paddingHorizontal: 18, color: '#6A7568', marginTop: 4 },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 12, elevation: 2 },
  image: { width: 76, height: 76, borderRadius: 12 },
  name: { fontSize: 17, fontWeight: '700' },
  meta: { color: '#6A7568', marginTop: 5 },
  empty: { flex: 1, justifyContent: 'center', padding: 36 },
  emptyText: { color: '#6A7568', textAlign: 'center', lineHeight: 22 },
});
