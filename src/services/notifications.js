import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function configureNotifications() {
  const current = await Notifications.getPermissionsAsync();
  let status = current.status;

  if (status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync();
    status = requested.status;
  }

  if (status !== 'granted') {
    throw new Error('Notification permission was not granted');
  }

  return status;
}

export async function triggerTestNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Pocket Recipes',
      body: 'Your test notification was triggered successfully!',
    },
    trigger: null,
  });
}
