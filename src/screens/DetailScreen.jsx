import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { loadFavorites, saveFavorites } from '../storage/localStorage';

export default function DetailScreen({ route }) {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadFavorites().then((items) => setIsFavorite(items.some((item) => item.id === recipe.id)));
  }, [recipe.id]);

  const toggleFavorite = async () => {
    const favorites = await loadFavorites();
    let next;
    if (favorites.some((item) => item.id === recipe.id)) {
      next = favorites.filter((item) => item.id !== recipe.id);
      setIsFavorite(false);
    } else {
      next = [...favorites, recipe];
      setIsFavorite(true);
    }
    await saveFavorites(next);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: recipe.image }} style={styles.hero} />
        <View style={styles.titleRow}>
          <Text style={styles.title}>{recipe.name}</Text>
          <Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
            <Text style={styles.favoriteText}>{isFavorite ? '♥' : '♡'}</Text>
          </Pressable>
        </View>
        <Text style={styles.meta}>{recipe.cuisine} • {recipe.difficulty} • ⭐ {recipe.rating}</Text>
        <Text style={styles.section}>Recipe information</Text>
        <Text style={styles.info}>Prep time: {recipe.prepTimeMinutes} minutes</Text>
        <Text style={styles.info}>Cook time: {recipe.cookTimeMinutes} minutes</Text>
        <Text style={styles.info}>Servings: {recipe.servings}</Text>
        <Text style={styles.section}>Ingredients</Text>
        {(recipe.ingredients || []).map((item, index) => <Text style={styles.bullet} key={`${item}-${index}`}>• {item}</Text>)}
        <Text style={styles.section}>Instructions</Text>
        {(recipe.instructions || []).map((item, index) => <Text style={styles.step} key={`${item}-${index}`}>{index + 1}. {item}</Text>)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7F3' },
  content: { paddingBottom: 30 },
  hero: { width: '100%', height: 280, backgroundColor: '#E8EEE5' },
  titleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, marginTop: 18 },
  title: { flex: 1, fontSize: 28, fontWeight: '800', color: '#263225' },
  favoriteButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E8F3E5', alignItems: 'center', justifyContent: 'center' },
  favoriteText: { fontSize: 28, color: '#2E7D32' },
  meta: { color: '#667264', paddingHorizontal: 18, marginTop: 8 },
  section: { fontSize: 19, fontWeight: '800', color: '#1B5E20', paddingHorizontal: 18, marginTop: 22, marginBottom: 8 },
  info: { paddingHorizontal: 18, color: '#455143', marginTop: 4 },
  bullet: { paddingHorizontal: 22, color: '#455143', marginTop: 5 },
  step: { paddingHorizontal: 18, color: '#455143', marginTop: 8, lineHeight: 21 },
});
