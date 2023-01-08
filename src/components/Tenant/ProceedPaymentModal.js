import React from 'react';
import {
    Image, Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable, ScrollView, StyleSheet, Text, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import colors from '../../assets/colors/colors';
import { icons } from '../../constants';
import commonStyles from '../../screens/styles';
import {
    IconToggle,
    Ripple
} from '../../utils';
import { Loading } from '../common';



const ProceedPaymentModal = ({ addEditPaymentModal, submitAddPayment, closeAddPaymentModal, loading}) => {
    const inputFieldValidation = addEditPaymentModal?.data?.type ? "#6d6d6d" : "rgb(255,55,95)";

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={addEditPaymentModal.visible}
        >
            <View style={styles.modalWrapper}>
                <Pressable style={styles.modalOverlay} onPress={() => closeAddPaymentModal()} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalView}
                    keyboardVerticalOffset= {-250}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalHeaderContainer}>
                            <View style={styles.modalHeaderWrapper}>
                                <View style={styles.modalDragContainer}>
                                    <View style={styles.modalDrag}/>
                                </View>
                                <TouchableOpacity onPress={() => closeAddPaymentModal()} style={styles.cancelContainer}>
                                    <Text style={styles.cancelContainerText}>Cancel</Text>
                                </TouchableOpacity>
                                <View style={[commonStyles.center, {paddingVertical:12}]}>
                                    <Text style={styles.modalLabelText}>{addEditPaymentModal.isAdd ? 'Proceed' : 'Edit'} to Payment</Text>
                                </View>
                                <Ripple onPress={() => submitAddPayment()} style={styles.submitContainer}>
                                    <Text 
                                        style={[styles.modalSubmitBtn, {
                                            color: addEditPaymentModal.data.type ? '#298df7': '#ccc'
                                        }]}
                                    >
                                        {addEditPaymentModal.pending ? 'Submitting' : 'Submit'}
                                    </Text>
                                </Ripple>
                            </View>
                            <ScrollView contentContainerStyle={styles.contentContainer}>
                            <View style={styles.contentContainer}>
                                <Text style={styles.contentText}>Choose the payment method</Text>
                                </View>
                                <View style={styles.contentContainer}>
                                    <Text style={styles.amountContentText}>Amount to be paid :   ₹ {addEditPaymentModal.data.amount}</Text>
                                </View>
                                <View style={styles.paymentContainer}>

                                    
                                    <Text style={styles.amountContentText}>Click here to pay</Text>

                                    <View
                                        style={[
                                            styles.roomsListIcon
                                        ]}>
                                        <TouchableOpacity
                                            onPress={() => { submitAddPayment() }}
                                        >
                                            {!addEditPaymentModal.loading ?
                                                <View style={styles.orderWrapper}>
                                                <Image
                                                    source={icons.paytmLogo}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                    }}
                                                />  
                                                    <IconToggle set={'feather'} name="chevron-right" size={18} color={colors.black} />
                                                </View>
                                                :
                                                <Loading size={'small'} />
                                            }

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

export default ProceedPaymentModal;

const styles = StyleSheet.create({
    contentContainer: {
        flex:1
    },
    modalWrapper: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    modalOverlay: {
        flex:0.6
    },
    modalView: {
        flex:0.4,
        overflow:'hidden',
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalHeaderContainer: {
        flex:1
    },
    modalHeaderWrapper: {
        justifyContent:'space-between', 
        flexDirection:'row', 
        backgroundColor:'#f9f9f9', 
        paddingTop:8, 
        paddingBottom:6, 
        borderBottomWidth: 1.5, 
        borderBottomColor: '#e5e5e5'
    },
    modalDragContainer: {
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        position:'absolute', 
        left:0, 
        right:0, 
        top:5, 
        bottom:0
    },
    modalDrag: {
        backgroundColor:'#d3d3d3', 
        height:5, 
        width:38, 
        borderRadius:12
    },
    cancelContainer: {
        marginLeft:12, 
        justifyContent:'center', 
        alignItems:'center'
    },
    cancelContainerText: {
        fontSize:17
    },
    modalLabelText: {
        fontSize: 18, 
        fontWeight: '600'
    },
    submitContainer: {
        alignItems:'center', 
        justifyContent: 'center', 
        marginRight:12
    },
    inputContainer: {
        flexDirection: 'row'
    },
    inputField: {
        flex:1,
        paddingHorizontal: 12,
        borderColor:'#ccc',
        fontSize: 17,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    modalSubmitBtn: {
        fontSize:17, 
        fontWeight:'600'
    },
    picker: {
		height: 50, 
		width: 200,
		top: 10,
		borderWidth: 1,
        width: '100%'
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
});


