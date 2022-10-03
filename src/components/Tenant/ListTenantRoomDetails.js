import React, { useContext, useState } from 'react';
import Moment from 'react-moment';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { default as Icon, default as MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import { GlobalContext } from '../../context/GlobalState';

const ListTenantRoomDetails = ({ roomDetails, navigation, routeDetails }) => {

    const { getTenantRoomsDetailsByRoomId, initTenantRoomOrderPayment, tenantBuildingFloorRoomsDetails, screenLoading, unLinkTenantRoomContract } = useContext(GlobalContext);
    const [showBox, setShowBox] = useState(true);

    const submitUnLinkTenantRoomContract = (roomTenantId, roomContractId) => {
        const payload = JSON.stringify({
          tenantId: roomTenantId,
          contractId: roomContractId,
          status: false
        })
    
        unLinkTenantRoomContract(payload);
        getTenantRoomsDetailsByRoomId(routeDetails.roomId)
      }
        
    const showConfirmDialog = (tenantId, contractId) => {
    
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to remove this tenant ?",
          [
            {
              text: "Yes",
              onPress: () => {
                submitUnLinkTenantRoomContract(tenantId, contractId);
                setShowBox(false);
              },
            },
            {
              text: "No",
            },
          ]
        );
      };


    return (
        <View style={styles.container} key={roomDetails._id}>
            <View style={styles.headerWrapper}>
             <View style={styles.headerLeft}>
                <Text style={styles.title}>Tenant Details</Text>
             </View>
              <TouchableOpacity onPress={() => showConfirmDialog(roomDetails.contractDetails.tenantDetails._id, roomDetails.contractDetails._id)}>
                <View style={styles.headerRight}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color={colors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {roomDetails.contractDetails.length < 1 && (
                <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>Room is empty</Text>
                    <Button
                        onPress={() =>
                            navigation.navigate('TenantSignUp', routeDetails)}
                    >Add tenant to room</Button>
                </View>
            )}
            <View style={styles.infoWrapper}>
                {roomDetails.contractDetails && (
                    <View style={styles.infoLeftWrapper}>
                                <View style={styles.infoItemWrapper}>
                                    <Text style={styles.infoItemTitle}>Name</Text>
                                    <Text style={styles.infoItemText}>
                                        {roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails.full_name : ""}
                                    </Text>
                                </View>
                                <View style={styles.infoItemWrapper}>
                                    <Icon name="map-marker-radius" color="#777777" size={20} />
                                    <Text style={styles.infoItemText}>
                                        {roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails.address : ""}
                                    </Text>
                                </View>
                                <View style={styles.infoItemWrapper}>
                                    <Icon name="phone" color="#777777" size={20} />
                                    <Text style={styles.infoItemText}>
                                        {roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails.mobile_no : ""}
                                    </Text>
                                </View>
                                <View style={styles.infoItemWrapper}>
                                    <Icon name="email" color="#777777" size={20} />
                                    <Text style={styles.infoItemText}>
                                        {roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails.email : ""}
                                    </Text>
                                </View>
                                <View style={styles.infoItemWrapper}>
                                    <FontAwesome name="hourglass-end" color="#777777" size={20} />
                                    <Text style={styles.infoItemText}>
                                        <Moment format="D MMM YYYY" element={Text}>{roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails.end_at : ""}</Moment>
                                    </Text>
                                </View>
                                <View style={styles.infoItemWrapper}>
                                    <Text style={styles.infoItemTitle}>Status</Text>
                                    <Text style={styles.infoItemText}>
                                        {roomDetails.contractDetails.tenantDetails ? (roomDetails.contractDetails.tenantDetails.status ? "Active" : "In Active") : ""}
                                    </Text>
                                </View>

                                <View style={styles.infoItemWrapper}>
                                    <Text style={styles.infoItemTitle}>Room No</Text>
                                    <Text style={styles.infoItemText}>{roomDetails.room_name}</Text>
                                </View>
                                <View style={styles.infoItemWrapper}>
                                    <Text style={styles.infoItemTitle}>Room Rent</Text>
                                    <Text style={styles.infoItemText}>
                                        ₹{roomDetails.contractDetails.price}
                                    </Text>
                                </View>
                    </View>
                )
                }
            </View>
        </View>
    )
}

export default ListTenantRoomDetails

const styles = StyleSheet.create({
    container: {
       
      },
      headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      headerLeft: {
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
        fontSize: 22,
        color: colors.textDark,
      },
      titleSecond: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
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
        justifyContent: 'flex-start',
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
        height: 100,
        width: 100
      },
})