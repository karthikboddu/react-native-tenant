import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import Moment from 'react-moment';
import { Alert, Linking, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { default as MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import { GlobalContext } from '../../context/GlobalState';
import { updateTenantRoomDetails } from '../../services/tenant/roomService';
import { IconToggle } from '../../utils';
import { Loading } from '../common';

const ListTenantRoomDetails = ({ roomDetails, navigation, routeDetails }) => {

  const { getTenantRoomsDetailsByRoomId, screenLoading, setScreenLoading, unLinkTenantRoomContract } = useContext(GlobalContext);
  const [showBox, setShowBox] = useState(true);
  const [showSave, setShowSave] = useState(false);

  const submitUnLinkTenantRoomContract = (roomTenantId, roomContractId) => {
    const payload = JSON.stringify({
      tenantId: roomTenantId,
      contractId: roomContractId,
      status: false
    })

    unLinkTenantRoomContract(payload);
    getTenantRoomsDetailsByRoomId(routeDetails.roomId)
  }
  const [data, setData] = React.useState({
    amount: 0,
    checkAmountChange: false,
    isValidAmount : true,
  });

  // if (data.amount != roomDetails.room_amount) {
  //   setShowSave(true);
  // }

  const handleAmountChange = (val) => {
    setShowSave(true)
    if( val.trim().length >= 6 ) {
        setData({
            ...data,
            amount: val,
            isValidAmount : true,
            checkAmountChange : true
        });
    } else {
        setData({
            ...data,
            amount: val,
            isValidAmount : false,
            checkAmountChange : false
        });
    }
    
}

const submitUpdates = async(room_amount) => {
  const payload = {
    room_amount
  }
  setScreenLoading(true);
  const response = await updateTenantRoomDetails(routeDetails.roomId, JSON.stringify(payload));
  setScreenLoading(false);
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


  const openDialScreen = (no) => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${no}`;
    } else {
      number = `tel:${no}`;
    }
    Linking.openURL(number);
  };

  return (
    <View style={styles.container} key={roomDetails._id}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Tenant Details</Text>
        </View>
        {roomDetails.tenantLinked && (
        <TouchableOpacity onPress={() => showConfirmDialog(roomDetails.contractDetails.tenantDetails._id, roomDetails.contractDetails._id)}>
          <View style={styles.headerRight}>
            <MaterialCommunityIcons
              name="delete"
              size={20}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
        )}
      </View>

      {/* {roomDetails.contractDetails.length < 1 && (
        <View style={styles.titlesWrapper}>
          <Text style={styles.title}>Room is empty</Text>
          <Button
            onPress={() =>
              navigation.navigate('TenantSignUp', routeDetails)}
          >Add tenant to room</Button>
        </View>
      )} */}


      <View style={styles.infoWrapper}>
        
          <View style={styles.infoLeftWrapper}>

            <View style={styles.infoItemWrapper}>
              <IconToggle
                set="Fontisto"
                name="room"
                color="#777777" size={16}
              />
              <Text style={styles.infoItemText}>{roomDetails.room_name}</Text>
            </View>
            <View style={styles.infoItemWrapper}>
              <IconToggle
                set="FontAwesome"
                name="rupee"
                color="#777777" size={16}
              />
              <TextInput
                  placeholder="Amount"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  editable={true}
                  defaultValue={roomDetails.room_amount.toString()}
                  style={styles.infoItemText}
                  onChangeText={(val) => handleAmountChange(val)}
                />
              {/* <Text style={styles.infoItemText}>
                ₹{roomDetails.room_amount}
              </Text> */}
            </View>
            {showSave && (
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {submitUpdates(data.amount)}}
                >
                <LinearGradient
                    colors={['#000000', '#000000']}
                    style={styles.signIn}
                >
                {!screenLoading ? 
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Save</Text>
                    :  <Loading size={'large'} />}
                </LinearGradient>
                </TouchableOpacity>

            </View>)}


            {roomDetails.tenantLinked ? (
              <>
            <View style={styles.infoItemWrapper}>
              <IconToggle
                name="user-o"
                set="FontAwesome"
                color="#777777"
                size={16}
              />
              <Text style={styles.infoItemText}>
                {roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails.full_name : ""}
              </Text>
            </View>
            <View style={styles.infoItemWrapper}>
              <IconToggle
                set="FontAwesome"
                name="map-marker"
                color="#777777" size={16}
              />
              <Text style={styles.infoItemText}>
                {roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails.address : ""}
              </Text>
            </View>
            <View style={styles.infoItemWrapper}>
              <IconToggle
                set="materialcommunityicons"
                name="phone"
                color="#777777" size={16}
                onPress={() =>
                  openDialScreen(roomDetails.contractDetails.tenantDetails.mobile_no)}
              />
              <Text style={styles.infoItemText}>
                {roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails.mobile_no : ""}
              </Text>
            </View>
            <View style={styles.infoItemWrapper}>
              <IconToggle
                set="MaterialCommunityIcons"
                name="email"
                color="#777777" size={16}
              />
              <Text style={styles.infoItemText}>
                {roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails.email : ""}
              </Text>
            </View>
            <View style={styles.infoItemWrapper}>
              <IconToggle
                set="FontAwesome"
                name="hourglass-end"
                color="#777777" size={16}
              />
              <Text style={styles.infoItemText}>
                <Moment format="D MMM YYYY" element={Text}>{roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails.end_at : ""}</Moment>
              </Text>
            </View>
            <View style={styles.infoItemWrapper}>
              <IconToggle
                set="material"
                name="progress-clock"
                color="#777777" size={16}
              />
              <Text style={styles.infoItemText}>
                {roomDetails.contractDetails.tenantDetails ? (roomDetails.contractDetails.tenantDetails.status ? "Active" : "In Active") : ""}
              </Text>
            </View>


            <View style={styles.infoItemWrapper}>
              <IconToggle
                set="Fontisto"
                name="preview"
                color="#777777" size={16}
              />

              <TouchableOpacity onPress={() => navigation.navigate('ViewTenantPdfFile', { tenantId: roomDetails.contractDetails.tenantDetails ? roomDetails.contractDetails.tenantDetails._id : null })}>
                <View style={styles.pdfWrapper}>
                  <Text style={styles.pdfText}>View Tenant Identity </Text>
                  <IconToggle
                    set="feather"
                    name="chevron-right"
                    color="#777777" size={16}
                  />
                </View>
              </TouchableOpacity>

            </View>
            </>        
            ) : (
              <View style={styles.titlesWrapper}>
                <Text style={styles.title}>Room is Empty</Text>
                <IconToggle
                  name={'book-plus-multiple'}
                  size={25}
                  set={'material'}
                  color={'#298df7'}
                  onPress={() =>
                    navigation.navigate('TenantSignUp', routeDetails)}
                />
              </View>
            )}
          </View>

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
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLeftWrapper: {
    paddingLeft :20
  },
  infoItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingLeft: 20
  },
  itemImage: {
    resizeMode: 'contain',
    marginLeft: 50,
    height: 100,
    width: 100
  },
  pdfWrapper: {

    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    paddingLeft:10
  },
  button: {
    alignItems: 'center',
},
signIn: {
    width: '50%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},
})