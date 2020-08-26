import { Platform } from 'react-native';
import firebase, {
  Notification,
  NotificationOpen
} from 'react-native-firebase';
import { COLOR_BASE_PRIMARY_MAIN } from '../styles';

class NotificationFirebase {
  displayNotification = async notification => {
    const channelId = new firebase.notifications.Android.Channel(
      'channelId',
      'palapaone',
      firebase.notifications.Android.Importance.Max
    );
    const typeNotif = notification._data.type;
    const imageNotif = notification._data.image ? true : false;
    await firebase.notifications().android.createChannel(channelId);
    const notificationShow = new firebase.notifications.Notification()
      .setNotificationId(notification._notificationId)
      .setTitle(notification._title)
      .setBody(notification._body)
      .setSound('default')
      .setData(notification._data);

    if (
      Platform.OS === 'android' &&
      typeNotif == 'BROADCAST' &&
      imageNotif == true
    ) {
      notificationShow.android
        .setChannelId('channelId')
        .android.setSmallIcon('ic_stat_notification')
        .android.setLargeIcon('ic_launcher')
        .android.setBigPicture(notification._data.image)
        .android.setColor(COLOR_BASE_PRIMARY_MAIN)
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setCategory(firebase.notifications.Android.Category.Alarm);
    } else if (
      Platform.OS === 'android' &&
      typeNotif == 'BROADCAST' &&
      imageNotif == false
    ) {
      notificationShow.android
        .setChannelId('channelId')
        .android.setSmallIcon('ic_stat_notification')
        .android.setLargeIcon('ic_launcher')
        .android.setColor(COLOR_BASE_PRIMARY_MAIN)
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setCategory(firebase.notifications.Android.Category.Alarm);
    } else {
      notificationShow.android
        .setChannelId('channelId')
        .android.setSmallIcon('ic_stat_notification')
        .android.setLargeIcon('ic_launcher')
        .android.setColor(COLOR_BASE_PRIMARY_MAIN)
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setCategory(firebase.notifications.Android.Category.Alarm);
    }

    await firebase.notifications().displayNotification(notificationShow);
  };

  notificationOpen = async () => {
    const notificationOpen: NotificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const notif: Notification = notificationOpen.notification;
      return notif;
    }
    return null;
  };

  hasPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    return enabled;
  };

  getToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    return fcmToken;
  };

  requestPermission = () => {
    firebase.messaging().requestPermission();
  };

  subscribeToTopic = topic => {
    firebase.messaging().subscribeToTopic(topic);
  };

  unsubscribeFromTopic = topic => {
    firebase.messaging().unsubscribeFromTopic(topic);
  };
}

export { NotificationFirebase };
export default new NotificationFirebase();
