import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
// import { Root } from 'popup-ui';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Moment from 'react-moment';
import {
  Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../assets/colors/colors';
import { Loading } from '../../../components/common';
import { SIZES } from "../../../constants";
import { GlobalContext } from '../../../context/GlobalState';
import { generatePaytmToken } from '../../../services/tenant/tenantService';



const PaymentDetails = () => {
  const navigation = useNavigation();

  const [loader, setLoader] = useState(false);
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [roomContractId, setRoomContractId] = useState(0);

  const [price, setPrice] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const { startPaytmTransaction, paytmTransactionResponse
    , screenLoading, setScreenLoading, getTenantRoomOrderDetails, tenantRoomOrderDetails,
    initTenantRoomOrderPayment, popupLoading, setPopup } = useContext(GlobalContext);


  useEffect(() => {
    //clearStateVariable();
    getTenantRoomOrderDetails('P,F', 1);
    initRoomPayment(tenantRoomOrderDetails.balance_amount, tenantRoomOrderDetails.floor_room_id)
    setPrice(tenantRoomOrderDetails.balance_amount)
    setRoomId(tenantRoomOrderDetails.floor_room_id)

  }, [])

  const [data, setData] = useState({
    amount: '',
    type: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [state, setState] = useState({
    amount: '',
    type: '',
    message: '',
    error: '',
    loading: false
  })

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'ROOM RENT', value: 'ROOM_RENT' },
    { label: 'WATER BILL', value: 'WATER_BILL' },
    { label: 'CURRENT BILL', value: 'CURRENT_BILL' },
    { label: 'OTHERS', value: 'OTHERS' }
  ]);


  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback((amount, orderId, roomCId) => {
    setAmount(amount);
    setOrderId(orderId);
    setRoomContractId(roomCId)
    bottomSheetModalRef.current?.present();
    
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        amount: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        amount: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }

  const handleTypeChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        type: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        type: val,
        isValidPassword: false
      });
    }
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }

  const loginHandle = async (amount, type) => {
    console.log(type,"type")
    if (amount.length == 0 || type.length == 0) {
      Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        { text: 'Okay' }
      ]);
      return;
    }

    //setScreenLoading(true)

    await initRoomPayment(amount, roomId, type);
  }



  const payNow = async (amount, orderId, roomCId) => {
    setScreenLoading(true);
    const min = 1;
    const max = 10000;
    const rand = min + Math.random() * (max - min);

    //getPaytmToken(orderId, amt);
    var raw = JSON.stringify({
      orderId: orderId,
      amt: amount,
      roomContractId: roomCId,
      buildingId: tenantRoomOrderDetails.buildingDetails[0]._id ? tenantRoomOrderDetails.buildingDetails[0]._id : null,
      buildingAmount: tenantRoomOrderDetails.buildingDetails[0].total_amount ? tenantRoomOrderDetails.buildingDetails[0].total_amount : 0
    });

    console.log(raw, "paytmPayload")

    const token = await generatePaytmToken("", raw);
    let resJson = await token.json();
    const txnToken = resJson.data?.body?.txnToken;
    console.log("gateway response1", resJson);

    startPaytmTransaction(resJson.data?.orderId, amount, txnToken, resJson.data?.buildingId, resJson.data?.buildingAmount);

    getTenantRoomOrderDetails('P,F', 1);
  }

  const initRoomPayment = async (amt, roomId, type = '') => {

    setScreenLoading(true);
    const yourDate = new Date()
    const NewDate = moment(yourDate, 'DD-MM-YYYY')


    var raw = JSON.stringify({
      roomId: roomId,
      amount: amt,
      paymentForDate: NewDate,
      type: type ? type : 'ROOM_RENT'
    });
    console.log(raw, "paytmPayload")

    initTenantRoomOrderPayment(raw);
    // getTenantRoomOrderDetails('P,F', 1);
  }

  function renderPaymentForm() {
    return (

      <View style={styles.popularWrapper}>
        <Text style={[styles.text_footer, {
          color: colors.text
        }]}>Enter amount</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="amount"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />

        </View>

        <Text style={[styles.text_footer, {
          color: colors.text
        }]}>Type Name</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="type"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="characters"
            onChangeText={(val) => handleTypeChange(val)}
          />

        </View>


        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => { loginHandle(data.amount, data.type) }}
          >
            <LinearGradient
              colors={['#212426', '#212426']}
              style={styles.signIn}
            >
              {!screenLoading ?
                <Text style={[styles.textSign, {
                  color: '#fff'
                }]}>Create Payment</Text>
                :
                <Loading size={'large'} />
              }

            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  function renderRecentTransactions() {
    const renderItem = ({ item }) => {
      if (!item) {
        return (<></>);
      }
      return (

        <TouchableRipple key={item._id}>
          <View
            style={[
              styles.popularCardWrapper
            ]}>



            <View
              style={[
                styles.popularCardWrapperAmount
              ]}>

              <View style={styles.popularTitlesWrapper}>
                <Text style={styles.infoItemTitle}>Type</Text>
                <Text style={styles.popularTitlesTitle}>
                  {item.room_payment_type}
                </Text>
              </View>



              <View style={styles.popularTitlesWrapper1}>
                <Text style={styles.infoItemTitle}>Amount</Text>
                <Text style={styles.popularTitlesTitle}>
                  {item.paymeny_status != 'C' ?
                    <MaterialIcons
                      name="pending"
                      size={20}
                      color={colors.pending}
                    /> :
                    <Ionicons
                      name="cloud-done-sharp"
                      size={20}
                      color={colors.done}
                    />
                  }
                </Text>

                <Text style={styles.popularTitlesTitle}>
                  ₹ {item.total_amount}
                </Text>
              </View>

              <View style={styles.popularTitlesWrapper}>
                <Text style={styles.popularTitlesTitle}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={colors.done}
                  />

                </Text>
                <Text style={styles.popularTitlesTitle}>
                  <Moment format="D MMM YYYY" key={item._id} element={Text}>{item.updated_at}</Moment>
                </Text>
              </View>

            </View>
            <View
              style={[
                styles.roomsListIcon
              ]}>
              <TouchableOpacity
                onPress={() => { handlePresentModalPress(item.total_amount, item._id, item.room_contract_id) }}
              >
                {!screenLoading ?
                  <View style={styles.orderWrapper}>
                    <Text style={styles.orderText}>Pay now</Text>
                    <Feather name="chevron-right" size={18} color={colors.black} />
                  </View>
                  :
                  <Loading size={'small'} />
                }

              </TouchableOpacity>
            </View>
          </View>
        </TouchableRipple>

      )
    }

    return (

      <View>
        <FlatList
          data={tenantRoomOrderDetails.orderDetails}

          onEndReachedThreshold={0.5}
          // onEndReached={() => setPage(page + 1)}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item ? `${item._id}` : 0}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
          
        />
      </View>
    )

  }



  return (


    // <Root>
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <ScrollView

          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>


          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.headerLeft}>
                <Feather name="chevron-left" size={12} color={colors.textDark} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.popularWrapper}>

            <Text style={styles.popularTitle}>Recent Transaction</Text>
            {renderRecentTransactions()}
            {renderPaymentForm()}
          </View>


          <View style={styles.container}>

            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
            >
              <View style={styles.contentContainer}>
                <Text style={styles.contentText}>Choose the payment method</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.amountContentText}>Amount to be paid :   ₹ {amount}</Text>
              </View>
              <View style={styles.paymentContainer}>
              <View style={styles.contentContainer}>
                <Text style={styles.amountContentText}>Click here for paytm  : </Text>
              </View>
              <View
              style={[
                styles.roomsListIcon
              ]}>
              <TouchableOpacity
                onPress={() => { payNow(amount, orderId, roomContractId) }}
              >
                {!screenLoading ?
                  <View style={styles.orderWrapper}>
                    <Text style={styles.orderText}>Pay now</Text>
                    <Feather name="chevron-right" size={18} color={colors.black} />
                  </View>
                  :
                  <Loading size={'small'} />
                }

              </TouchableOpacity>
            </View>
            </View>
            </BottomSheetModal>
          </View>

        </ScrollView>


      </View>
    </BottomSheetModalProvider>
      // </Root>
  )
}

export default PaymentDetails

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
  popularWrapper: {
    paddingHorizontal: 20,
    marginBottom: 30,
    height: 'auto'
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 10
  },
  popularCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingTop: 20,
    paddingLeft: 20,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    height: 140,
  },
  popularCardWrapperAmount: {
    borderRadius: 25,
    paddingTop: 20,

    paddingLeft: 20,
    flexDirection: 'column',
    overflow: 'hidden',
    height: 130,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  popularTitlesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularTitlesWrapper1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularTitlesTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.textDark,
  },
  popularTitlesWeight: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: colors.textLight,
    // marginTop: 5,
  },
  popularCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -20,
  },
  addPizzaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  rating: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.textDark,
    marginLeft: 5,
  },
  popularCardRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    //marginTop: 20,
  },
  popularCardImage: {
    color: '#000',
    marginLeft: 5
  },
  roomsListIcon1: {
    marginLeft: 23,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  orderWrapper: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: colors.orange,
    borderRadius: 50,
    width: 80,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    paddingLeft: 5,
    marginRight: 10,
    alignItems: 'center'
  },
  infoItemTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: colors.textLight,
    paddingRight: 50,
  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  dropdown: {
    justifyContent: 'center',
    paddingTop: '20',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  contentContainer: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 10
  },
  contentText : {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    textAlign : 'center',
    marginTop: 50
  },
  amountContentText : {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginTop: 20
  },
  paymentContainer: {
    flexDirection: 'row'
  }

})
