import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { Loading } from "../common";

const PendingTransactionsList = () => {

    const [amount, setAmount] = useState(0);
    const [orderId, setOrderId] = useState(0);
    const [roomContractId, setRoomContractId] = useState(0);
    const [price, setPrice] = useState(0);
    const [roomId, setRoomId] = useState(0);

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ["25%", "75%"], []);
    const { startPaytmTransaction, paytmTransactionResponse
        , screenLoading, setScreenLoading, getTenantRoomOrderDetails, tenantRoomOrderDetails,
        initTenantRoomOrderPayment, popupLoading, setPopup } = useContext(GlobalContext);

    // callbacks
    const handlePresentModalPress = useCallback((amount, orderId, roomCId) => {
        setAmount(amount);
        setOrderId(orderId);
        setRoomContractId(roomCId)
        bottomSheetModalRef.current?.present();

    }, []);

    useEffect(() => {

        setPrice(tenantRoomOrderDetails.balance_amount)
        setRoomId(tenantRoomOrderDetails.floor_room_id)
    
      }, [])
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

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
                            onPress={() => { handlePresentModalPress(item.price, item._id, item.room_contract_id) }}
                        >
                            {!screenLoading ?
                                <View style={styles.orderWrapper}>
                                    <Text style={styles.orderText}>Pay</Text>
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
        <BottomSheetModalProvider>
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
        </BottomSheetModalProvider>
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