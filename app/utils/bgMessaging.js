/* eslint-disable import/no-duplicates */
import firebase, { RemoteMessage } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
  const notification = new firebase.notifications.Notification();
  notification.android.setPriority(
    firebase.notifications.Android.Priority.High
  );
  notification.android.setChannelId('test-channel');
  notification.setTitle(message.data.custom1);

  firebase.notifications().displayNotification(notification);

  return Promise.resolve(message);
};
