// Expo Go-safe notification demo service for Pocket Recipes.
//
// Expo Go cannot load expo-notifications for Android push notifications.
// These functions provide an in-app test flow so the rest of the project can
// run in Expo Go. For a true native notification, use a development build and
// add expo-notifications back to the project.

export async function configureNotifications() {
  return {
    status: 'configured (Expo Go demo mode)',
    native: false,
  };
}

export async function triggerTestNotification() {
  return {
    native: false,
    title: 'Pocket Recipes',
    message: 'Your test notification was triggered successfully!',
  };
}
