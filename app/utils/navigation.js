import { NavigationActions } from 'react-navigation';

export default {
  replace(routeName, params) {
    return NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })]
    });
  }
};
