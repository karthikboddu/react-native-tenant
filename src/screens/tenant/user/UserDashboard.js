import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../../../assets/colors/colors'
import { COLORS } from '../../../constants'
import HeaderProfileScreen from '../../account/HeaderProfileScreen'
import CardListScreen from './CardListScreen'

const UserDashboard = () => {


  React.useEffect(() => {
    //clearStateVariable();
  }, [])

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView>
        <HeaderProfileScreen />
      </SafeAreaView>


      {/* Search */}
      <View style={styles.searchWrapper}>
        <Feather name="search" size={16} color={colors.textDark} />
        <View style={styles.search}>
          <Text style={styles.searchText}>Search</Text>
        </View>
      </View>
      <Text style={styles.titlesTitle}>My accounts</Text>
      <View style={{ marginBottom: 200 }}>
        <CardListScreen />
      </View>
    </View>
  )
}

export default UserDashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  titlesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: colors.darkGray,
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 10
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 2,
  },
  searchText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginBottom: 5,
    color: colors.textLight,
  },

})