import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../../assets/colors/colors';
import { GlobalContext } from '../../context/GlobalState';
import { Loading } from '../common';


const CreatePaymentForm = ({roomId}) => {

    const { startPaytmTransaction, paytmTransactionResponse
        , screenLoading, setScreenLoading, getTenantRoomOrderDetails, tenantRoomOrderDetails,
        initTenantRoomOrderPayment, popupLoading, setPopup } = useContext(GlobalContext);

    const [data, setData] = useState({
        amount: '',
        type: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
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



    const loginHandle = async (amount, type) => {
        if (amount.length == 0 || type.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        //setScreenLoading(true)

        await initRoomPayment(amount, roomId, type);
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

        initTenantRoomOrderPayment(raw);
        // getTenantRoomOrderDetails('P,F', 1);
    }




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
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Description</Text>
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
    )
}

export default CreatePaymentForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    popularWrapper: {
        paddingHorizontal: 20,
        marginBottom: 30,
        height: 'auto'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
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
})