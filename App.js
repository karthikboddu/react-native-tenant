import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button} from 'react-native';
import { theme } from './src/core/theme';
import { GlobalProvider } from './src/context/GlobalState';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import Router from './src/Router';
import { useNetInfo } from "@react-native-community/netinfo";
import Modals from './src/components/NetInfoModal';
import FlashMessage from 'react-native-flash-message';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';



WebBrowser.maybeCompleteAuthSession();

export default function App() {

  let netInfo = useNetInfo();
 

  return (
    <PaperProvider theme={theme}>
      {netInfo.isConnected ? (
        <GlobalProvider>
          <Router />
        </GlobalProvider>
      ) : <Modals
        show={netInfo.isConnected}
        isRetrying={false}
      />}
      <FlashMessage position="bottom" floating />
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});
