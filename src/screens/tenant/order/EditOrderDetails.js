import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assets/colors/colors';
import { GlobalContext } from '../../../context/GlobalState';



const EditOrderDetails = (route) => {

    const { getTenantRoomsDetailsByRoomId, tenantBuildingFloorRoomsDetails, screenLoading, createRoomOrderPaymentAndComplete } = useContext(GlobalContext);
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)


    useEffect(() => {
        console.log(route?.route?.params?.tenantId, "tenantId", route?.route?.params?.roomPaymentId, "roomid", route?.route?.params?.roomId)
        let query = '?roomPaymentId=' + route?.route?.params?.roomPaymentId
        getTenantRoomsDetailsByRoomId(route?.route?.params?.roomId, query);
    }, []);

    const submitUpdateOrderDetails = (existingBuildingId, existinAmount, existingBuildingAmount) => {
        const payload = {
            tenantId: route?.route?.params?.tenantId,
            roomPaymentId: route?.route?.params?.roomPaymentId,
            paymentStatus: isEnabled ? "C" : "P",
            amount: existinAmount,
            buildingId: existingBuildingId
        }

        createRoomOrderPaymentAndComplete(JSON.stringify(payload))
        if (!screenLoading) {
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>

            <SafeAreaView>
                <View style={styles.headerWrapper}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={styles.headerLeft}>
                            <Feather name="chevron-left" size={12} color={colors.textDark} />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Titles */}
            <View style={styles.titlesWrapper}>
                <Text style={styles.title}>Edit Tenant Order Details</Text>
                {/* <Image source={item.image} style={styles.itemImage} /> */}
            </View>

            {tenantBuildingFloorRoomsDetails.map(item => (


                <Animated.View style={{
                    margin: 20,
                }} key={item._id}>


                    <View key={item.contractDetails._id}>
                        <View style={styles.action}>
                            <FontAwesome name="user-o" color={colors.text} size={20} />
                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor="#666666"
                                editable={false}
                                autoCorrect={false}
                                value={item.contractDetails.tenantDetails ? item.contractDetails.tenantDetails.full_name : ""}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            />
                        </View>

                        <View style={styles.action}>
                            <FontAwesome name="user-o" color={colors.text} size={20} />
                            <TextInput
                                placeholder="Room Name"
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                                editable={false}
                                value={item.room_name}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            />
                        </View>

                        <View style={styles.action}>
                            <FontAwesome name="building-o" color={colors.text} size={20} />
                            <TextInput
                                placeholder="building"
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                                editable={false}
                                value={item.contractDetails.buildingDetails ? item.contractDetails.buildingDetails.building_name : ""}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            />
                        </View>
                        <View style={styles.action}>
                            <FontAwesome name="rupee" color={colors.text} size={20} />
                            <TextInput
                                placeholder="amount"
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                                editable={false}
                                value={item.contractDetails.orderDetails ? item.contractDetails.orderDetails.price : ""}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            />
                        </View>
                        <View style={styles.action}>
                            <FontAwesome name="user-o" color={colors.text} size={20} />
                            <TextInput
                                placeholder="Order status"
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                                editable={false}
                                value={item.contractDetails.orderDetails.payment_status ?
                                    (item.contractDetails.orderDetails.payment_status == 'C'
                                        ? 'Success' : (item.contractDetails.orderDetails.payment_status == 'P' ? 'Pending' : 'Failure')) : ""}
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            />
                        </View>
                        {item.contractDetails.orderDetails && (
                            <>
                                {(item.contractDetails.orderDetails.payment_status == 'P') && (
                                    <View >
                                        <View style={styles.action}>
                                            {!isEnabled ? (<Text>Pending</Text>) : (<Text>Success</Text>)}
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch}
                                                value={isEnabled}
                                            />
                                        </View>
                                        <View>
                                            <TouchableOpacity style={styles.commandButton}
                                                onPress={() => {
                                                    submitUpdateOrderDetails(item.contractDetails.buildingDetails
                                                        ? item.contractDetails.buildingDetails._id : null, item.contractDetails.orderDetails
                                                        ? item.contractDetails.orderDetails.price : 0, item.contractDetails.buildingDetails
                                                        ? item.contractDetails.buildingDetails.total_amount : "")
                                                }}>
                                                <Text style={styles.panelButtonTitle}>Submit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </>
                        )}
                    </View>



                </Animated.View>
            ))}
        </View>
    )
}

export default EditOrderDetails

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    titlesWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        color: colors.textDark,
        width: '50%',
    },

})