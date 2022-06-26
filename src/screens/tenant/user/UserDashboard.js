import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardListScreen from './CardListScreen'
import colors from '../../../assets/colors/colors'
import RecentTransactions from '../RecentTransactions'

const UserDashboard = () => {


  React.useEffect(() => {
    //clearStateVariable();
  }, [])

  return (
    <View style={styles.titlesWrapper}>
          <Text style={styles.titlesTitle}>My accounts</Text>
          <CardListScreen/>
          <RecentTransactions/>
    </View>
  )
}

export default UserDashboard

const styles = StyleSheet.create({

  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
},

titlesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: colors.darkGray,
    marginTop: 5,
    marginBottom: 10
},

})