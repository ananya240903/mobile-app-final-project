const API_URL = 'https://dummyjson.com/recipes?limit=12';

export async function fetchRecipes() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Unable to fetch recipes');
  }
  const data = await response.json();
  return data.recipes || [];
}
