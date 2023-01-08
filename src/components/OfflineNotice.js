import { DefaultTheme as NavigationDefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import colors from '../assets/colors/colors';
import { GlobalContext } from '../context/GlobalState';
import ListTenants from '../screens/tenant/ListTenants';
const OfflineNotice = ({navigation}) => {
  const { isTransParentStatusBar, transparentStatusBG } = useContext(GlobalContext);
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
    return (
      <NavigationContainer theme={CustomDefaultTheme}>
      {!isTransParentStatusBar ? (
        <StatusBar translucent backgroundColor="transparent" />) 
        : (
      <StatusBar backgroundColor={transparentStatusBG} barStyle="light-content" />
      )}
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
        <ListTenants/>
      </View>
      </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex : 1
  },
  image: {
    height: 500,
    width: 500,
  },
  text: {
    fontSize: 25,
    alignContent: 'center',
    
    paddingLeft : 50
  },
  orderWrapper: {
    marginTop: 40,
    marginBottom: 50,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    marginRight: 10,
  },
});

export default OfflineNotice;