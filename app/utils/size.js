import { Platform, StatusBar, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window'),
  iphonex =
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812);

export default {
  statusbar: Platform.select({
    ios: iphonex ? 44 : 20,
    android: StatusBar.currentHeight
  }),
  toolbar: Platform.select({
    ios: 44,
    android: 56
  })
};
