import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable, ScrollView, StyleSheet, Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import commonStyles from '../../screens/styles';
import {
    IconToggle,
    Ripple
} from '../../utils';




const AddRoomPayment = ({ addEditPaymentModal, submitAddPayment, onChangeInput, closeAddPaymentModal}) => {
    const inputFieldValidation = addEditPaymentModal?.data?.type ? "#6d6d6d" : "rgb(255,55,95)";
    const [selectedCategory, setSelectedCategory] = useState('');


    const categoryList =  [
        {
            id: 1,
            category_name: 'ROOM_RENT'
        },
        {
            id: 2,
            category_name: 'ELECTRICITY'
        },
        {
            id: 3,
            category_name: 'OTHERS'
        }
    ];

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
                                    <Text style={styles.modalLabelText}>{addEditPaymentModal.isAdd ? 'Add' : 'Edit'} Book</Text>
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
                                <View style={styles.inputContainer}>
                                    <View>
                                        <IconToggle
                                            name={"book"}
                                            set={"entypo"}
                                            color={inputFieldValidation}
                                            size={30}
                                        />
                                    </View>
                                    {/* <TextInput
                                        style={styles.inputField}
                                        onChangeText={(value) => onChangeInput(value, 'type')}
                                        value={addEditPaymentModal.data.type}
                                        placeholder="Payment Type"
                                    /> */}
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={selectedCategory}
                                        onValueChange={(itemValue, itemIndex) =>
                                            onChangeInput(itemValue, 'type')
                                        }>
                                        {
                                            categoryList.map((item) => {
                                                return(
                                                    <Picker.Item key={item.id} label={item.category_name} value={item.category_name} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </View>
                                <View style={commonStyles.vSpace2} />
                                <View style={commonStyles.row}>
                                    <View>
                                        <IconToggle
                                            name={"account-tie"}
                                            set={"material"}
                                            color={"#6d6d6d"}
                                            size={30}

                                        />
                                    </View>
                                    <TextInput
                                        style={styles.inputField}
                                        onChangeText={(value) => onChangeInput(value, 'description')}
                                        value={addEditPaymentModal.data.description}
                                        placeholder="Description"
                                    />
                                </View>
                                <View style={commonStyles.vSpace2} />
                                <View style={commonStyles.row}>
                                    <View>
                                        <IconToggle
                                            name={"pricetags"}
                                            set={"ionicons"}
                                            color={"#6d6d6d"}
                                            size={30}

                                        />
                                    </View>
                                    <TextInput
                                        style={[styles.inputField, {borderBottomWidth:0}]}
                                        onChangeText={(value) => onChangeInput(value, 'amount')}
                                        value={addEditPaymentModal.data.amount}
                                        placeholder="Price"
                                        keyboardType='numeric'
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

export default AddRoomPayment;

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
});


