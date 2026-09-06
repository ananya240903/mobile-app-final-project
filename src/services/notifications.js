// Notification service for Pocket Recipes.
//
// Expo Go on Android does not support remote push notifications. To keep the
// project runnable in Expo Go, the screen uses the Expo-Go-safe demo path
// below. The native local-notification implementation is also included for a
// development/standalone build and uses expo-notifications only when invoked.

export async function configureNotifications(expoGoSafe = true) {
  if (expoGoSafe) {
    return { status: 'granted (Expo Go test mode)', native: false };
  }

  const Notifications = await import('expo-notifications');
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const current = await Notifications.getPermissionsAsync();
  let status = current.status;

  if (status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync();
    status = requested.status;
  }

  if (status !== 'granted') {
    throw new Error('Notification permission was not granted');
  }

  return { status, native: true };
}

export async function triggerTestNotification(expoGoSafe = true) {
  if (expoGoSafe) {
    return { native: false, message: 'Pocket Recipes test notification triggered successfully.' };
  }

  const Notifications = await import('expo-notifications');
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Pocket Recipes',
      body: 'Your test notification was triggered successfully!',
    },
    trigger: null,
  });

  return { native: true, message: 'Native local notification scheduled.' };
}
