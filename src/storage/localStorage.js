import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@pocket_recipes_favorites';
const SETTINGS_KEY = '@pocket_recipes_settings';
const USER_KEY = '@pocket_recipes_user';

export async function saveFavorites(favorites) {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function loadFavorites() {
  const value = await AsyncStorage.getItem(FAVORITES_KEY);
  return value ? JSON.parse(value) : [];
}

export async function saveSettings(settings) {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function loadSettings() {
  const value = await AsyncStorage.getItem(SETTINGS_KEY);
  return value ? JSON.parse(value) : { notificationsEnabled: false, darkMode: false };
}

export async function saveUser(user) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function loadUser() {
  const value = await AsyncStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) : null;
}

export async function clearUser() {
  await AsyncStorage.removeItem(USER_KEY);
}
