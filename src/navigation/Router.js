//import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, NavigationContainer
} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Platform, StatusBar, View } from 'react-native';
import {
  DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';
import { GlobalContext } from '../context/GlobalState';
import Tabs from '../navigation/tabs';
import SignInScreen from '../screens/account/SignInScreen';


export default function Router(props) {


  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const { userToken, getUserToken, screenLoading, isTransParentStatusBar } = useContext(GlobalContext);

  const { isLoading } = useContext(GlobalContext);
  const { allstate } = useContext(GlobalContext);

  const [loaded] = useFonts({
    "Roboto-Black": require('../assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold": require('../assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular": require('../assets/fonts/Roboto-Regular.ttf'),
    "Montserrat-SemiBold": require('../assets/fonts/Montserrat-SemiBold.ttf'),
    "Montserrat-Bold": require('../assets/fonts/Montserrat-Bold.ttf'),
    "Montserrat-Medium": require('../assets/fonts/Montserrat-Medium.ttf'),
    "Montserrat-Regular": require('../assets/fonts/Montserrat-Regular.ttf')

  })

  useEffect(() => {
    getUserToken();
  }, []);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {Platform.OS == 'web' ? (<ActivityIndicator size="large" color="#663399" />)
          :
          (<LottieView source={require('../assets/97930-loading.json')} autoPlay loop />)}

      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      {!isTransParentStatusBar ? (
        <StatusBar translucent backgroundColor="transparent" />) 
        : (
      <StatusBar backgroundColor="#CDCDD2" barStyle="light-content" />
      )}

      {/* <Overlay isShow={screenLoading} /> */}
      {userToken !== null ? (
        <Tabs />
      )
        :
        <SignInScreen />
      }
    </NavigationContainer>
  );
}
