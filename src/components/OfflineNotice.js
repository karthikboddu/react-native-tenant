import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../assets/colors/colors';
import { COLORS } from '../constants';
import ListTenants from '../screens/tenant/ListTenants';

const OfflineNotice = ({navigation}) => {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
        <ListTenants/>
      </View>
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
    backgroundColor : COLORS.darkgray,
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