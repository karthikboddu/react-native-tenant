import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../../assets/colors/colors';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants'
import { GlobalContext } from '../../context/GlobalState';

import HeaderProfileScreen from '../account/HeaderProfileScreen';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './AdminDashboard';

// Feather.loadFont();
// MaterialCommunityIcons.loadFont();

const Dashboard = ({ navigation }) => {



  const { isAdmin } = React.useContext(GlobalContext);
  // if (isAdmin) {
  //   navigation.navigate('AdminDashboard')
  // } else {
  //   navigation.navigate('UserDashboard')
  // }
  return (
    <View style={styles.container}>
      <ScrollView
        
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>

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

        {isAdmin ? (
          <>
            <AdminDashboard navigate={navigation} />

          </>
        ) : (
          <UserDashboard />
        )}


      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },

  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.textDark,
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
  categoriesWrapper: {
    marginTop: 30,
  },
  categoriesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  categoriesListWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  categoryItemWrapper: {
    backgroundColor: '#78ADF9',
    marginRight: 20,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 2,

  },
  categoryItemImage: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginHorizontal: 20,
    overflow: 'hidden'
  },
  categoryItemTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#000'
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  categorySelectIcon: {
    alignSelf: 'center',
  },
  categoryItemDetails: {
    flexDirection: 'row'
  },
  categoryItemLocation: {
    fontSize: 15,
    fontWeight: "bold",
    color: '#000'
  },
  categoryItemLocationIcon: {
    marginLeft: 20,
    paddingRight: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  categoryItemDetailsAmount: {
    flexDirection: 'row'
  },
  categoryItemDetailsAmountIcon: {
    marginLeft: 20,
    paddingRight: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  categoryItemDetailsAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#000'
  }
});
