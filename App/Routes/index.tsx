import React, { useContext } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './AppRoutes';
import { AppContext } from '../AppContext';
import CommonStyle from '../Theme/CommonStyle';
import NavigationService from '../Utils/NavigationService';

const Stack = createStackNavigator();

const App = () => {
  const { appTheme } = useContext(AppContext);
  return (
    <View style={CommonStyle.flexContainer}>
      <StatusBar
        backgroundColor={appTheme.background}
        barStyle={appTheme.statusBar}
      />
      <NavigationContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}>
        <Stack.Navigator
          initialRouteName="InitialScreen"
          screenOptions={({ route, navigation }) => ({
            headerShown: true,
            cardOverlayEnabled: true,
            headerBackTitleVisible: false,
            presentation: 'card',
          })}>
          {Routes.map(route => {
            return (
              <Stack.Screen
                name={route.name}
                component={route.screen}
                key={route.name}
                options={route.navigationOptions || {}}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
