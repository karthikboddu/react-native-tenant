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
import * as Animatable from 'react-native-animatable';
import commonStyles from '../../screens/styles';
import {
    IconToggle,
    Ripple
} from '../../utils';
import { Loading } from '../common';



const AddTenantFloors = ({ addEditPaymentModal, submitAddPayment, onChangeInput, closeAddPaymentModal }) => {
    const inputFieldValidation = addEditPaymentModal?.data?.type ? "#6d6d6d" : "rgb(255,55,95)";
    const [selectedCategory, setSelectedCategory] = useState('');



    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={addEditPaymentModal.visible}
        >

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <View style={styles.modalWrapper}>
                    <Pressable style={styles.modalOverlay} onPress={() => closeAddPaymentModal()} />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.modalView}
                        keyboardVerticalOffset={-250}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalHeaderContainer}>
                                <View style={styles.modalHeaderWrapper}>
                                    <View style={styles.modalDragContainer}>
                                        <View style={styles.modalDrag} />
                                    </View>
                                    <TouchableOpacity onPress={() => closeAddPaymentModal()} style={styles.cancelContainer}>
                                        <Text style={styles.cancelContainerText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <View style={[commonStyles.center, { paddingVertical: 12 }]}>
                                        <Text style={styles.modalLabelText}>{addEditPaymentModal.isAdd ? 'Add' : 'Edit'} {addEditPaymentModal.data.isAddRoom ? 'Room ' : 'Floors'}  Details </Text>
                                    </View>
                                    <Ripple onPress={() => submitAddPayment()} style={styles.submitContainer}>
                                        <Text
                                            style={[styles.modalSubmitBtn, {
                                                color: addEditPaymentModal.data.floorName  || addEditPaymentModal.data.roomName ? '#298df7' : '#ccc'
                                            }]}
                                        >
                                            {addEditPaymentModal.pending ? <Loading size={'small'} /> : 'Submit'}
                                        </Text>
                                    </Ripple>
                                </View>
                                <ScrollView contentContainerStyle={styles.contentContainer}>

                                    {!addEditPaymentModal.isAddRoom && (
                                        <>
                                            <View style={commonStyles.vSpace2} />
                                            <View style={commonStyles.row}>
                                                <View>
                                                    <IconToggle
                                                        name={"description"}
                                                        set={"materialicons"}
                                                        color={"#6d6d6d"}
                                                        size={30}

                                                    />
                                                </View>
                                                <TextInput
                                                    style={styles.inputField}
                                                    onChangeText={(value) => onChangeInput(value, 'floorName')}
                                                    value={addEditPaymentModal.data.floorName}
                                                    placeholder="Floor Name"
                                                />
                                            </View>
                                            <View style={commonStyles.vSpace2} />
                                            <View style={commonStyles.row}>
                                                <View>
                                                    <IconToggle
                                                        name={"rupee"}
                                                        set={"FontAwesome"}
                                                        color={"#6d6d6d"}
                                                        size={30}

                                                    />
                                                </View>
                                                <TextInput
                                                    style={[styles.inputField, { borderBottomWidth: 0 }]}
                                                    onChangeText={(value) => onChangeInput(value, 'noOfRooms')}
                                                    value={addEditPaymentModal.data.noOfRooms}
                                                    placeholder="No Of Rooms"
                                                    keyboardType='numeric'
                                                />
                                            </View>
                                        </>
                                    )}
                                    {addEditPaymentModal.isAddRoom && (
                                        <>
                                            <View style={commonStyles.vSpace2} />
                                            <View style={commonStyles.row}>
                                                <View>
                                                    <IconToggle
                                                        name={"description"}
                                                        set={"materialicons"}
                                                        color={"#6d6d6d"}
                                                        size={30}

                                                    />
                                                </View>
                                                <TextInput
                                                    style={styles.inputField}
                                                    onChangeText={(value) => onChangeInput(value, 'roomName')}
                                                    value={addEditPaymentModal.data.roomName}
                                                    placeholder="Room Name"
                                                />
                                            </View>


                                            <View style={commonStyles.vSpace2} />
                                            <View style={commonStyles.row}>
                                                <View>
                                                    <IconToggle
                                                        name={"rupee"}
                                                        set={"FontAwesome"}
                                                        color={"#6d6d6d"}
                                                        size={30}

                                                    />
                                                </View>
                                                <TextInput
                                                    style={[styles.inputField, { borderBottomWidth: 0 }]}
                                                    onChangeText={(value) => onChangeInput(value, 'roomAmount')}
                                                    value={addEditPaymentModal.data.roomAmount}
                                                    placeholder="Price"
                                                    keyboardType='numeric'
                                                />
                                            </View>
                                        </>
                                    )}
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </Animatable.View>
        </Modal>
    );
}

export default AddTenantFloors;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1
    },
    modalWrapper: {
        flex: 1,
    },
    modalOverlay: {
        flex: 0.6
    },
    modalView: {
        flex: 0.4,
        overflow: 'hidden',
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
        flex: 1
    },
    modalHeaderWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        paddingTop: 8,
        paddingBottom: 6,
        borderBottomWidth: 1.5,
        borderBottomColor: '#e5e5e5'
    },
    modalDragContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 5,
        bottom: 0
    },
    modalDrag: {
        backgroundColor: '#d3d3d3',
        height: 5,
        width: 38,
        borderRadius: 12
    },
    cancelContainer: {
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelContainerText: {
        fontSize: 17
    },
    modalLabelText: {
        fontSize: 18,
        fontWeight: '600'
    },
    submitContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },
    inputContainer: {
        flexDirection: 'row'
    },
    inputField: {
        flex: 1,
        paddingHorizontal: 12,
        borderColor: '#ccc',
        fontSize: 17,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    modalSubmitBtn: {
        fontSize: 17,
        fontWeight: '600'
    },
    picker: {
        height: 50,
        width: 200,
        top: 10,
        borderWidth: 1,
        width: '100%'
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 30,
        paddingVertical: 70
    },
});


