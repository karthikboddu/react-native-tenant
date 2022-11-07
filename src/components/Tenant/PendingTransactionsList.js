import React, { useContext, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/colors/colors';
import { SIZES } from "../../constants";
import { GlobalContext } from '../../context/GlobalState';
import { generatePaytmToken } from '../../services/tenant/tenantService';
import ProceedPaymentModal from "./ProceedPaymentModal";

const PendingTransactionsList = () => {

    const [amount, setAmount] = useState(0);
    const [orderId, setOrderId] = useState(0);
    const [roomContractId, setRoomContractId] = useState(0);
    const [price, setPrice] = useState(0);
    const [roomId, setRoomId] = useState(0);

    const { startPaytmTransaction, paytmTransactionResponse
        , screenLoading, setScreenLoading, getTenantRoomOrderDetails, tenantRoomOrderDetails,
        initTenantRoomOrderPayment, popupLoading, setPopup } = useContext(GlobalContext);



    const initialPaymentValues = {
        roomContractId: '',
        orderId: '',
        amount: '',
        paymentForDate : new Date()
      };
    
    const initialAddEditRoomPaymentValues = {
        pending: false,
        failed: false,
        visible: false,
        loading : false,
        data: initialPaymentValues,
        isAdd: null
      };
    
    const [addEditPaymentModal, setAddEditPaymentModall] = useState(initialAddEditRoomPaymentValues);

    const openAddEditPaymentModal = (action, data , price, orderId, room_contract_id) => {

        data.amount = price;
        data.orderId = orderId;
        data.roomContractId = room_contract_id;
        setAddEditPaymentModall((prevState) => ({
          ...prevState,
          isAdd: action === 'add',
          visible: true,
          data
        }));
    }

    const onChangeInput = (inputValue, inputName) => {
        setAddEditPaymentModall({
          ...addEditPaymentModal,
          data: {
            ...addEditPaymentModal.data,
            [inputName]: inputValue
          }
        });
      }
  
    const closeAddEditPaymentModal = () => {
      setAddEditPaymentModall((prevState) => ({
        ...prevState,
        visible: false
      }));
    }

    const submitAddEditPayment = async () => {
        await payNow(addEditPaymentModal.data.amount, addEditPaymentModal.data.orderId, addEditPaymentModal.data.roomContractId);
    };
  

    useEffect(() => {

        setPrice(tenantRoomOrderDetails.balance_amount)
        setRoomId(tenantRoomOrderDetails.floor_room_id)
    
      }, [])


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
    
    
        const token = await generatePaytmToken("", raw);
        let resJson = await token.json();
        const txnToken = resJson.data?.body?.txnToken;
    
        startPaytmTransaction(resJson.data?.orderId, amount, txnToken, resJson.data?.buildingId, resJson.data?.buildingAmount);
        closeAddEditPaymentModal();
        getTenantRoomOrderDetails('P,F', 1);
      }
    
      const renderFooter = () => {
        return (
          //Footer View with Load More button
          <View style={styles.footer}>
            
          </View>
        );
      };

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
                                {item.payment_status != 'C' ?
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
                                ₹ {item.price}
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
                            onPress={() => openAddEditPaymentModal('add', initialPaymentValues, item.price, item._id, item.room_contract_id)}
                        >
                                <View style={styles.orderWrapper}>
                                    <Text style={styles.orderText}>Pay</Text>
                                    <Feather name="chevron-right" size={18} color={colors.black} />
                                </View>

                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableRipple>

        )
    }

    return (
        <View>
            <View>
                <FlatList
                    data={tenantRoomOrderDetails.orderDetails}
                    onEndReachedThreshold={0.5}
                    // onEndReached={() => setPage(page + 1)}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item ? `${item._id}` : 0}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                    ListFooterComponent={renderFooter}
                />
            </View>

            <View style={styles.container}>
            </View>
            {addEditPaymentModal.visible && (
            <ProceedPaymentModal
                    addEditPaymentModal={addEditPaymentModal}
                    closeAddPaymentModal={closeAddEditPaymentModal}
                    submitAddPayment={submitAddEditPayment}
                />
                )}
            </View>
    )
}

export default PendingTransactionsList

const styles = StyleSheet.create({
    container: {

      },
      popularCardWrapper: {
        backgroundColor: colors.white,
        borderRadius: 25,
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
        height: 100,
        paddingLeft: 20,
        margin: 20
      },
      popularCardWrapperAmount: {
        borderRadius: 25,
        paddingTop: 20,
    
        paddingLeft: 20,
        flexDirection: 'column',
        overflow: 'hidden',
        height: 130,
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
      orderText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        paddingLeft: 5,
        marginRight: 10,
        alignItems: 'center'
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
      infoItemTitle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: colors.textLight,
        paddingRight: 50,
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
      },
      footer: {
          marginBottom :50
      }
})