import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useNetInfo } from "@react-native-community/netinfo";
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet } from 'react-native';
// import FlashMessage from 'react-native-flash-message';
import {
  Provider as PaperProvider
} from 'react-native-paper';
import Toast, { BaseToast } from 'react-native-toast-message';
import OfflineNotice from './src/components/OfflineNotice';
import { GlobalProvider } from './src/context/GlobalState';
import { theme } from './src/core/theme';
import Router from './src/navigation/Router';


WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const netInfo = useNetInfo();

  const toastConfig = {
    success: ({ text1,text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: 'bold'
        }}
        text1={text1}
        text2={text2}
      />
    ),
    error: ({ text1,text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: 'red' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: 'bold'
        }}
        text1={text1}
        text2={text2}
      />
    )
  };

  return (
    
    <PaperProvider theme={theme}>
        <GlobalProvider>
        {netInfo.type !== 'unknown' && netInfo.isInternetReachable === false ? (
          <OfflineNotice/>
        ) : (
        <ActionSheetProvider>
          <Router />
          </ActionSheetProvider>
          )}
        </GlobalProvider>
      <Toast config={toastConfig}/>
      {/* <FlashMessage position="bottom" floating /> */}
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
