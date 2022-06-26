import React,{ useState, useContext, useEffect } from 'react';

import { StyleSheet, Text, View,ScrollView,SafeAreaView,TouchableOpacity,Image } from 'react-native'
import colors from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../../context/GlobalState';



const TenantRoomDetails = ({ route, navigation }) => { 
    const { item } = route.params;



    const {getTenantRoomsDetailsByRoomId,tenantBuildingFloorRoomsDetails} = useContext(GlobalContext);

    useEffect(() => {
      getTenantRoomsDetailsByRoomId(route.params?.item)
      console.log("tennat room details ",tenantBuildingFloorRoomsDetails)
    }, [route.params?.items])

    return (
        <ScrollView>
        {tenantBuildingFloorRoomsDetails.map( data => (
            <View style={styles.container} key= {data.created_at}>
                {/* Header */}
                <SafeAreaView>
                    <View style={styles.headerWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={styles.headerLeft}>
                                <Feather name="chevron-left" size={12} color={colors.textDark} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.headerRight}>
                            <MaterialCommunityIcons
                                name="star"
                                size={12}
                                color={colors.white}
                            />
                        </View>
                    </View>
                </SafeAreaView>

                {/* Titles */}
                {/* <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image source={item.image} style={styles.itemImage} />
                </View> */}

                {/* Price */}
                <View style={styles.priceWrapper}>
                    <Text style={styles.priceText}>{data.amount}</Text>
                </View>

                {/* Pizza info */}
                <View style={styles.infoWrapper}>
                    <View style={styles.infoLeftWrapper}>
                        <View style={styles.infoItemWrapper}>
                            <Text style={styles.infoItemTitle}>Address</Text>
                            <Text style={styles.infoItemText}>
                                {data.address}
                            </Text>
                        </View>
                        <View style={styles.infoItemWrapper}>
                            <Text style={styles.infoItemTitle}>Room No</Text>
                            <Text style={styles.infoItemText}>{data.room_name}</Text>
                        </View>
                        <View style={styles.infoItemWrapper}>
                            <Text style={styles.infoItemTitle}>Rooms</Text>
                            <Text style={styles.infoItemText}>{data.deliveryTime}</Text>
                        </View>
                    </View>

                </View>
            </View>
            ))}
        </ScrollView>
    )
}

export default TenantRoomDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      headerLeft: {
        borderColor: colors.textLight,
        borderWidth: 2,
        padding: 12,
        borderRadius: 10,
      },
      headerRight: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 10,
        borderColor: colors.primary,
        borderWidth: 2,
      },
      titlesWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 30,
      },
      title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        color: colors.textDark,
        width: '50%',
      },
      priceWrapper: {
        marginTop: 20,
        paddingHorizontal: 20,
      },
      priceText: {
        color: colors.primary,
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
      },
      infoWrapper: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      infoLeftWrapper: {
        paddingLeft: 20,
      },
      infoItemWrapper: {
      },
      infoItemTitle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: colors.textLight,
      },
      infoItemText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: colors.textDark,
      },
      itemImage: {
        resizeMode: 'contain',
        marginLeft: 50,
        height:100,
        width:100
      },
})
