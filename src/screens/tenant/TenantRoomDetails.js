import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { default as Icon, default as MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import Button from '../../components/Button';
import { GlobalContext } from '../../context/GlobalState';



const TenantRoomDetails = ({ route, navigation }) => { 
    const { item } = route.params;
    const [loader, setLoader] = useState(false)
    const [showBox, setShowBox] = useState(true);


    const {getTenantRoomsDetailsByRoomId,tenantBuildingFloorRoomsDetails, screenLoading, unLinkTenantRoomContract} = useContext(GlobalContext);

    useEffect(() => {
      setLoader(true)
      getTenantRoomsDetailsByRoomId(route.params?.item)
      setLoader(false)
      console.log("tennat room details ",route.params)
    }, [route.params?.items])



    if (screenLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#663399" />
        </View>
      );
    }
  
    if (loader) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#663399" />
        </View>
      );
    }

    if (tenantBuildingFloorRoomsDetails.length < 1) {
      return (
        <View style={styles.titlesWrapper}>
          <Text style={styles.title}>Room is empty.</Text>
        </View>
      )
    } 

  const submitUnLinkTenantRoomContract = (roomTenantId, roomContractId) => {
      const payload = JSON.stringify({
        tenantId : roomTenantId,
        contractId : roomContractId,
        status : false
      })
 
      unLinkTenantRoomContract(payload);
      getTenantRoomsDetailsByRoomId(route.params?.item)
  }

  const showConfirmDialog = (tenantId, contractId) => {
    console.log("clicked")
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this beautiful box?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            submitUnLinkTenantRoomContract(tenantId,contractId);
            setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

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
                        <TouchableOpacity onPress={() => showConfirmDialog(data.contractDetails[0].tenantDetails[0]._id, data.contractDetails[0]._id)}>
                        <View style={styles.headerRight}>
                            <MaterialCommunityIcons
                                name="delete"
                                size={20}
                                color={colors.white}
                            />
                        </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* Titles */}
                <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>Tenant Details</Text>
                    {/* <Image source={item.image} style={styles.itemImage} /> */}
                </View>
                

                {/* Price */}
                {/* <View style={styles.priceWrapper}>
                    <Text style={styles.priceText}>{data.amount}</Text>
                </View> */}
                {data.contractDetails.length < 1 && (
                  <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>Room is empty</Text>
                    <Button
                     onPress={() =>
                                      navigation.navigate('TenantSignUp', {
                    roomId: route.params?.item, buildingId : route.params?.buildingItemId, buildingFloorId : data.building_floor_id
                    })}
                    >Add tenant to room</Button>
                    {/* <Image source={item.image} style={styles.itemImage} /> */}
                </View>
                )}

                <View style={styles.infoWrapper}>
                  
                    {data.contractDetails && (            
                    <View style={styles.infoLeftWrapper}>
                        {data.contractDetails.map(m => (
                        <View key={m._id}>
                        <View style={styles.infoItemWrapper}>
                            <Text style={styles.infoItemTitle}>Name</Text>
                            <Text style={styles.infoItemText}>
                                {m.tenantDetails[0] ? m.tenantDetails[0].full_name : ""}
                            </Text>
                        </View>
                        <View style={styles.infoItemWrapper}>
                            <Icon name="map-marker-radius" color="#777777" size={20} />
                            <Text style={styles.infoItemText}>
                              {m.tenantDetails[0] ? m.tenantDetails[0].address : ""}
                            </Text>
                        </View>
                        <View style={styles.infoItemWrapper}>
                            <Icon name="phone" color="#777777" size={20}/>
                            <Text style={styles.infoItemText}>
                              {m.tenantDetails[0] ? m.tenantDetails[0].mobile_no : ""}
                            </Text>
                        </View>
                        <View style={styles.infoItemWrapper}>
                            <Icon name="email" color="#777777" size={20}/>
                            <Text style={styles.infoItemText}>
                              {m.tenantDetails[0] ? m.tenantDetails[0].email : ""}
                            </Text>
                        </View>
                        <View style={styles.infoItemWrapper}>
                            <FontAwesome name="hourglass-end" color="#777777" size={20} />
                            <Text style={styles.infoItemText}>
                              {m.tenantDetails[0] ? m.tenantDetails[0].end_at : ""}
                            </Text>
                        </View>
                        <View style={styles.infoItemWrapper}>
                        <Text style={styles.infoItemTitle}>Status</Text>
                            <Text style={styles.infoItemText}>
                              {m.tenantDetails[0] ? (m.tenantDetails[0].status ? "Active" : "In Active") : ""}
                            </Text>
                        </View>

                        <View style={styles.infoItemWrapper}>
                            <Text style={styles.infoItemTitle}>Room No</Text>
                            <Text style={styles.infoItemText}>{data.room_name}</Text>
                        </View>
                        <View style={styles.infoItemWrapper}>
                            <Text style={styles.infoItemTitle}>Room Rent</Text>
                            <Text style={styles.infoItemText}>
                              ₹{m.actual_price}
                            </Text>
                        </View>
                        </View> 
                        ))}
                    </View>
                    )
                    }  
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
      },
      infoItemTitle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: colors.textLight,
        paddingRight: 20,
      },
      infoItemText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: colors.textDark,
        paddingLeft: 50
      },
      itemImage: {
        resizeMode: 'contain',
        marginLeft: 50,
        height:100,
        width:100
      },
})
