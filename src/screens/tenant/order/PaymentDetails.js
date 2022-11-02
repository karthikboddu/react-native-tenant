import { useActionSheet } from "@expo/react-native-action-sheet";
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Root } from 'popup-ui';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../assets/colors/colors';
import AddRoomPayment from "../../../components/Tenant/AddRoomPayment";
import PendingTransactionsList from "../../../components/Tenant/PendingTransactionsList";
import { GlobalContext } from '../../../context/GlobalState';
import { IconToggle } from '../../../utils';



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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);


  const [items, setItems] = useState([
    { label: 'ROOM RENT', value: 'ROOM_RENT' },
    { label: 'WATER BILL', value: 'WATER_BILL' },
    { label: 'CURRENT BILL', value: 'CURRENT_BILL' },
    { label: 'OTHERS', value: 'OTHERS' }
  ])

  const initialPaymentValues = {
    type: '',
    description: '',
    amount: '',
    roomId: tenantRoomOrderDetails.floor_room_id,
    paymentForDate : new Date()
  };

  const initialAddEditRoomPaymentValues = {
    pending: false,
    failed: false,
    visible: false,
    data: initialPaymentValues,
    isAdd: null
  };

  const [addEditPaymentModal, setAddEditPaymentModall] = useState(initialAddEditRoomPaymentValues);

  const onChangeInput = (inputValue, inputName) => {
    setAddEditPaymentModall({
      ...addEditPaymentModal,
      data: {
        ...addEditPaymentModal.data,
        [inputName]: inputValue
      }
    });
  }

  const submitAddEditPayment = async () => {
    if (addEditPaymentModal.data.type.length ==0 || addEditPaymentModal.data.amount.length ==0 || addEditPaymentModal.data.description.length==0 ) {
      Alert.alert('Wrong Input!', 'Some Fields cannot be empty.', [
          {text: 'Okay'}
      ]);
      return;
    }
    await initRoomPayment1();
  };

  const openAddEditPaymentModal = (action, data) => {
      setAddEditPaymentModall((prevState) => ({
        ...prevState,
        isAdd: action === 'add',
        visible: true,
        data
      }));
  }

  const closeAddEditPaymentModal = () => {
    setAddEditPaymentModall((prevState) => ({
      ...prevState,
      visible: false
    }));
  }

  const { showActionSheetWithOptions } = useActionSheet();

  const icons = [
    <IconToggle
      set={'fontAwesome'}
      name={'close'}
      size={22}
    />,
    <IconToggle
      set={'fontAwesome'}
      name={'edit'}
      size={22}
    />,
    <IconToggle
      set={'fontAwesome'}
      name={'trash'}
      size={22}
    />
  ];

  const handleActionMenuList = (dataItem) => {
    showActionSheetWithOptions({
      options: ["Cancel", "Edit Book"],
      destructiveButtonIndex: 2,
      cancelButtonIndex: 0,
      userInterfaceStyle: 'light',
      icons
    }, buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {
        // Edit Book
        openAddEditPaymentModal('edit', dataItem);
      }
    });
  }

  const initRoomPayment1 = async () => {

    const payload = JSON.stringify(addEditPaymentModal.data);

    console.log(payload, "paytmPayload",'&tenantId=')

    initTenantRoomOrderPayment(payload, '');
    setAddEditPaymentModall((prevState) => ({
      ...prevState,
      visible: false
    }));
    
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

  return (


    <Root>
      <View style={styles.container}>
        {/* <ScrollView

          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}> */}


          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.headerLeft}>
                <Feather name="chevron-left" size={12} color={colors.textDark} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
                <View style={styles.headerRight}>
                <IconToggle
                  name={'book-plus-multiple'}
                  size={30}
                  set={'material'}
                  color={'#298df7'}
                  onPress={() => openAddEditPaymentModal('add', initialPaymentValues)}
                />
                </View>
              </TouchableOpacity>
          </View>
          <PendingTransactionsList/>

          {/* <View style={styles.popularWrapper}>
            <View style={styles.headerTitleWrapper}>
              <Text style={styles.popularTitle}>Recent Transaction</Text>
              <IconToggle
                name={'book-plus-multiple'}
                size={30}
                set={'material'}
                color={'#298df7'}
                onPress={() => openAddEditPaymentModal('add', initialPaymentValues)}
              />
              
            </View>

          </View> */}
          {addEditPaymentModal.visible && (
              <AddRoomPayment
                addEditPaymentModal={addEditPaymentModal}
                closeAddPaymentModal={closeAddEditPaymentModal}
                submitAddPayment={submitAddEditPayment}
                onChangeInput={onChangeInput}
                handleActionMenuList={handleActionMenuList}
              />
            )}

        {/* </ScrollView> */}


      </View>
    </Root>
  )
}

export default PaymentDetails

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexGrow:1
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
    borderRadius: 10,
  
  },
  popularWrapper: {
    paddingHorizontal: 20,
    marginBottom: 30,
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
  headerTitleWrapper : {
    flexDirection: 'row',
    
  }
  

})
