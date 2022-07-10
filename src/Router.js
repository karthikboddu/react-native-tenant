import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, NavigationContainer
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import {
  DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';
import { GlobalContext } from './context/GlobalState';
import Tabs from './navigation/tabs';
import {
  DrawerContent
} from './screens';
import SignInScreen from './screens/account/SignInScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default function Router(props) {


  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const { userToken, getUserToken } = useContext(GlobalContext);

  const { loading } = useContext(GlobalContext);
  const { allstate } = useContext(GlobalContext);

  const [loaded] = useFonts({
    "Roboto-Black": require('./assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
    "Montserrat-SemiBold": require('./assets/fonts/Montserrat-SemiBold.ttf'),
    "Montserrat-Bold": require('./assets/fonts/Montserrat-Bold.ttf'),
    "Montserrat-Medium": require('./assets/fonts/Montserrat-Medium.ttf'),
    "Montserrat-Regular": require('./assets/fonts/Montserrat-Regular.ttf')

  })


  useEffect(() => {
    getUserToken()
    console.log(userToken,"decoded")
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
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#663399" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      <StatusBar backgroundColor='#000' barStyle="light-content" />
      {userToken !== null ? (
        <Drawer.Navigator screenOptions={{
          headerShown: false
        }} drawerContent={props => <DrawerContent {...props} />}>
          {/* <Drawer.Screen name="HomeDrawer" component={MainTabScreen} /> */}
          <Drawer.Screen name="Home" component={Tabs} />
          {/* <Drawer.Screen name="Restaurant" component={Restaurant} />*/}
        </Drawer.Navigator>
      )
        :
        <SignInScreen />
      }
    </NavigationContainer>
  );
}
