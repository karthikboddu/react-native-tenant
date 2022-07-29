import { useNetInfo } from "@react-native-community/netinfo";
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {
  Provider as PaperProvider
} from 'react-native-paper';
import Modals from './src/components/NetInfoModal';
import { GlobalProvider } from './src/context/GlobalState';
import { theme } from './src/core/theme';
import Router from './src/navigation/Router';


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
