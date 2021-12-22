import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';

let _navigator: NavigationContainerRef<ReactNavigation.RootParamList>;

function setTopLevelNavigator(
  navigatorRef: NavigationContainerRef<ReactNavigation.RootParamList>,
) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params?: object) {
  _navigator.dispatch(CommonActions.navigate({ name: routeName, params }));
}

function dispatch(action: CommonActions.Action) {
  if (!_navigator) {
    return;
  }
  _navigator.dispatch(action);
}

// add other navigation functions that you need and export them

const NavigationService = {
  navigate,
  setTopLevelNavigator,
  dispatch,
};
export default NavigationService;
