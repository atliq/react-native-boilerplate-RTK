import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { store } from './Stores';
import { Provider } from 'react-redux';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import instance, { ApiConfig } from './ApiConfig';
import { getItemFromStorage } from './Utils/Storage';
import { configureUrl } from './Utils/Helper';
import { AppContextProvider } from './AppContext';
import CommonStyle from './Theme/CommonStyle';
import Routes from './Routes';
import { NoConnection } from './Screens/SubComponents';
import { handleInvalidToken } from './Services';

instance.interceptors.request.use(
  async config => {
    let request = config;
    let token: string | null = ApiConfig.token;
    if (!token) {
      token = await getItemFromStorage('token');
    }
    request.headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    request.url = configureUrl(config.url!);
    return request;
  },
  error => error,
);

instance.interceptors.response.use(
  async response => response,
  error => {
    if (error.response.status === 401) {
      handleInvalidToken();
      return;
    }
  },
);

interface CustomProps {
  // ADD IF ANY PROPS HERE WITH THEIR RESPECTIVE TYPES
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const App = (props: CustomProps) => {
  const [isConnected, setIsConnected] = useState(true);
  let netInfoSubscription: NetInfoSubscription | null = null;

  useEffect(() => {
    manageConnection();
    return () => {
      if (netInfoSubscription) {
        netInfoSubscription();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const manageConnection = () => {
    retryConnection();
    netInfoSubscription = NetInfo.addEventListener(handleConnectivityChange);
  };

  // Managed internet connection
  const handleConnectivityChange = (info: NetInfoState) => {
    if (info.type === 'none' || !info.isConnected) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  };

  // Check network connection
  const retryConnection = async () => {
    handleConnectivityChange(await NetInfo.fetch());
  };

  return (
    <Provider store={store}>
      <AppContextProvider>
        <View style={CommonStyle.flexContainer}>
          <Routes />
          {(!isConnected && (
            <NoConnection retryConnection={retryConnection} />
          )) ||
            null}
        </View>
      </AppContextProvider>
    </Provider>
  );
};

export default App;
