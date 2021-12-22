import React, { useState, useContext } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import CommonStyle from '../../../Theme/CommonStyle';
import { AppContext } from '../../../AppContext';
import { SettingHeader, SettingRow } from '../../SubComponents';
import { useAppDispatch } from '../../../Stores/Hooks';
import { logout } from '../../../Slices/authSlice';

const LANGUAGES = [
  { title: 'Hindi', value: 'hi' },
  { title: 'English', value: 'en' },
  { title: 'German', value: 'de' },
];

interface CustomProps {
  //YOUR PROPS WITH TYPES
}
const Settings = (props: CustomProps) => {
  const { appTheme, setAppTheme, appLanguage, setAppLanguage, translations } =
    useContext(AppContext);
  const [darkMode, setDarkMode] = useState(appTheme.type === 'dark');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onValueChange = () => {
    setAppTheme((!darkMode && 'dark') || 'light');
    setDarkMode(!darkMode);
  };

  const userLogout = () => {
    Alert.alert(
      '',
      'Do you want to logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: onLogout,
        },
      ],
      { cancelable: true },
    );
  };

  const onLogout = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }),
    );
    dispatch(logout());
  };

  const onSelectLanguage = (value?: any) => {
    setAppLanguage(value);
  };

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        { backgroundColor: appTheme.background },
      ]}>
      <SettingHeader title={translations.THEME} />
      <SettingRow
        isSwitch={true}
        title={translations.DARK_MODE}
        onPress={onValueChange}
        value={darkMode}
      />
      <SettingHeader title={translations.LANGUAGE} />
      {LANGUAGES.map(obj => {
        return (
          <SettingRow
            {...obj}
            onPress={onSelectLanguage}
            isSelected={appLanguage === obj.value}
            key={obj.value}
          />
        );
      })}
      <SettingRow
        title={translations.LOG_OUT}
        onPress={userLogout}
        value={darkMode}
        textStyle={{ color: appTheme.red }}
      />
    </SafeAreaView>
  );
};

export default Settings;
