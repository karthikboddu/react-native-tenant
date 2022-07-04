import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../../assets/colors/colors'
import RecentTransactions from '../RecentTransactions'
import CardListScreen from './CardListScreen'

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