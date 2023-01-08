import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../assets/colors/colors';
import { COLORS } from '../../../constants';
import HeaderProfileScreen from '../../account/HeaderProfileScreen';


const SuperAdminDashboard = ({navigation}) => {
  return (
    <View style={styles.container}>

            {/* Header */}
            <SafeAreaView>
                <HeaderProfileScreen navigation={navigation}/>
            </SafeAreaView>   

            {/* Search */}
            <View style={styles.searchWrapper}>
                <Feather name="search" size={16} color={colors.textDark} />
                <View style={styles.search}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')
                                                        }>
                    <Text style={styles.searchText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View> 
        <View style={[styles.categoryContainer, {marginTop: 50}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => navigation.navigate('ParentTenantSignUp')}>
          <View style={styles.categoryIcon}>
            <Ionicons name="md-person-add" size={35} color={colors.primary} />
          </View>
          <Text style={styles.categoryBtnTxt}>Create Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {navigation.navigate('ListTenantAdmins')}}>
          <View style={styles.categoryIcon}>
            <Feather name="users" size={35} color={colors.primary} />
          </View>
          <Text style={styles.categoryBtnTxt}>View Tenants</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => navigation.navigate('TenantAdminDashboard')}>
          <View style={styles.categoryIcon}>
            <FontAwesome name="building" size={35} color={colors.primary} />
          </View>
          <Text style={styles.categoryBtnTxt}>View Buildings</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="expand-more" size={35} color={colors.primary} />
          </View>
          <Text style={styles.categoryBtnTxt}>Show More</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

export default SuperAdminDashboard

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: COLORS.white
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
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
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
        marginTop : 100
      },
      categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
      },
      categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor:colors.textDark,
        borderRadius: 50,
      },
      categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: colors.textDark,
      },
})