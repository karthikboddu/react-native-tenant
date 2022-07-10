import { useNavigation } from '@react-navigation/native';
import CheckBox from "expo-checkbox";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Overlay from '../../components/Overlay';
import { GlobalContext } from '../../context/GlobalState';


const TenantSignUp = ({route}) => {

    const navigation = useNavigation();

    console.log(route.params)
    const [data, setData] = React.useState({
        username: '',
        password: '',
        email : '',
        aadharId : '',
        mobileNo: '',
        address: '',
        fullName: '',
        confirm_password: '',
        actualPrice : 0,
        price : 0,
        balanceAmount: 0,
        noOfPersons : 0,
        advancePaid: false,
        checkFullNameChange: false,
        checkUsernameChange : false,
        checkEmailChange : false,
        checkPasswordChange : false,
        checkConfirmPasswordChange : false,
        checkMobileNoChange : false,
        checkAddressChange : false,
        checkAadharIdChange : false,
        checkAtualPriceChange : false,
        checkPriceChange : false,
        checkNoOfPersonsChange : false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidFullname : true,
        isValidUsername : true,
        isValidEmail : true,
        isValidPassword : true,
        isValidMobileNo : true,
        isValidAddress : true,
        isValidAadharId : true,
        isValidActualPrice : true,
        isValidPrice : true,
        isValidNoofPersons : true,
        isValidConfirmPassword : true
    });

    const [isSelected, setSelection] = useState(false);
    const { screenLoading, setScreenLoading, isAdmin, createTenantAddToRoomOrderPayment,createTenantAddToRoomContractList } = React.useContext(GlobalContext);


    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }


    const handleFullNameChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                fullName: val,
                isValidFullname  : true,
                checkFullNameChange : true
            });
        }else{
            setData({
                ...data,
                fullName: val,
                isValidFullname  : false,
                checkFullNameChange : false
            });
        }

    }    

    const handleMobileNoChange = (val) => {
        if( val.trim().length >= 10 ) {
            setData({
                ...data,
                mobileNo: val,
                isValidMobileNo : true,
                checkMobileNoChange : true
            });
        } else {
            setData({
                ...data,
                mobileNo: val,
                isValidMobileNo : false,
                checkMobileNoChange : false
            });
        }

    }

    const handleEmailChange = (val) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        if (reg.test(val)) {
            setData({
                ...data,
                email: val,
                isValidEmail : true,
                checkEmailChange : true
            });
        } else {
            setData({
                ...data,
                email: val,
                isValidEmail : false,
                checkEmailChange : false
            });
        }
        
    }

    const handleAddressChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                address: val,
                isValidAddress : true,
                checkAddressChange : true
            });
        } else {
            setData({
                ...data,
                address: val,
                isValidAddress : false,
                checkAddressChange : false
            });
        }
        
    }

    const handleAadharIdChange = (val) => {
        if( val.trim().length >= 12 ) {
            setData({
                ...data,
                aadharId: val,
                isValidAadharId : true,
                checkAadharIdChange : true
            });
        } else {

            setData({
                ...data,
                aadharId: val,
                isValidAadharId : false,
                checkAadharIdChange : false
            });
        }
        
    }

    const handleActualPriceChange = (val) => {
        if( val > 0 ) {
            setData({
                ...data,
                actualPrice: val,
                isValidActualPrice : true,
                checkAtualPriceChange : true
            });

        } else {
            setData({
                ...data,
                actualPrice: val,
                isValidActualPrice : false,
                checkAtualPriceChange : false
            });
        }

    }

    const handlePriceChange = (val) => {
        if( val > 0 ) { 
            setData({
                ...data,
                price: val,
                isValidPrice: true,
                checkPriceChange : true
            });
        } else {
            setData({
                ...data,
                price: val,
                isValidPrice: false,
                checkPriceChange : false
            });
        }

    }
    
    const handleBalanceAmountChange = (val) => {
        setData({
            ...data,
            balanceAmount: val
        });
    }
    const handleNoOfPersonsChange = (val) => {
        if( val > 0 ) { 
            setData({
                ...data,
                noOfPersons: val,
                isValidNoofPersons : true,
                checkNoOfPersonsChange : true
            });
        } else {
            setData({
                ...data,
                noOfPersons: val,
                isValidNoofPersons : false,
                checkNoOfPersonsChange : false
            });
        }
        
    }
    
    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                isValidPassword : true,
                checkPasswordChange : true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword : false,
                checkPasswordChange : false
            });
        }
        
    }

    const handleConfirmPasswordChange = (val) => {
        if( val.trim().length >= 6 && data.password == val) {
            setData({
                ...data,
                confirm_password: val,
                isValidPassword : true,
                checkConfirmPasswordChange : true
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
                isValidPassword : false,
                checkConfirmPasswordChange : false
            });
        }

    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const signUpHandle = (fullName,email, username,password,aadharId, mobileNo, address,actualPrice,
        price,advancePaid,noOfPersons,balanceAmount, buildingId,buildingFloorId,roomId) => {
        const payload = {
            fullName,
            email,
            username,
            password,
            aadharId,
            mobileNo,
            address,
            actualPrice,
            price,
            advancePaid,
            noOfPersons,
            balanceAmount,
            buildingId,
            buildingFloorId,
            roomId
        }
        // if ( username.length == 0 || password.length == 0 || aadharId.length ==0 || email.length ==0 ||
        //     fullName.length==0 || mobileNo.length ==0 || address.length ==0  || actualPrice ==0 || price ==0
        //     || advancePaid == false|| noOfPersons ==0 || balanceAmount ==0) {
        //     Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        //         {text: 'Okay'}
        //     ]);
        //     return;
        // }
        console.log(payload)
        setScreenLoading(true)
        createTenantAddToRoomOrderPayment(JSON.stringify(payload))
        // if (createTenantAddToRoomContractList?.status) {
            // navigation.navigate('TenantRoomDetails')
        // }

    }

    return (
      <View style={styles.container}>
        <Overlay isShow={screenLoading} />


        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            {/* <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.headerLeft}>
                        <Feather name="chevron-left" size={12} color={colors.textDark} />
                    </View>
                </TouchableOpacity>

            </View> */}
            <Text style={styles.text_footer}>Enter Full Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Full Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleFullNameChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidFullname ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>FullName must be 4 characters long.</Text>
            </Animatable.View>
            }

            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            { data.isValidUsername ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }

            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <Feather 
                    name="mail"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleEmailChange(val)}
                />
                {data.checkEmailChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            { data.isValidEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email is not valid.</Text>
            </Animatable.View>
            }

            <Text style={styles.text_footer}>Mobile Number</Text>
            <View style={styles.action}>
                <Fontisto 
                    name="mobile-alt"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Mobile Number"
                    style={styles.textInput}
                    keyboardType='numeric'
                    maxLength={10} 
                    autoCapitalize="none"
                    onChangeText={(val) => handleMobileNoChange(val)}
                />
                {data.checkMobileNoChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View> 
            { data.isValidMobileNo ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Mobile Number must be 10 characters long.</Text>
            </Animatable.View>
            }


            <Text style={styles.text_footer}>Address</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="address-card"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleAddressChange(val)}
                />
                {data.checkAddressChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>             

            { data.isValidAddress ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Address must not be empty.</Text>
            </Animatable.View>
            }

            <Text style={styles.text_footer}>Aadhar Id</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="id-card-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Aadhar Id"
                    style={styles.textInput}
                    keyboardType='numeric'
                    maxLength={12} 
                    autoCapitalize="none"
                    onChangeText={(val) => handleAadharIdChange(val)}
                />
                {data.checkAadharIdChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>    

            { data.isValidAadharId ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Aadhar Id must be 12 characters long.</Text>
            </Animatable.View>
            }

            <Text style={styles.text_footer}>Enter Actual Room Amount</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="rupee"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="amount"
                    style={styles.textInput}
                    keyboardType='numeric'
                    maxLength={10} 
                    autoCapitalize="none"
                    onChangeText={(val) => handleActualPriceChange(val)}
                />
                {data.checkAtualPriceChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>


            { data.isValidActualPrice ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Actual price must not be empty.</Text>
            </Animatable.View>
            }

            <Text style={styles.text_footer}>Enter Room Amount paid</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="rupee"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="amount"
                    style={styles.textInput}
                    keyboardType='numeric'
                    maxLength={10} 
                    autoCapitalize="none"
                    onChangeText={(val) => handlePriceChange(val)}
                />
                {data.checkPriceChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View> 

            { data.isValidPrice ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Price must not be empty.</Text>
            </Animatable.View>
            }             

            <Text style={styles.text_footer}>Number of persons</Text>
            <View style={styles.action}>
                <Fontisto 
                    name="persons"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="number of persons"
                    style={styles.textInput}
                    keyboardType='numeric'
                    maxLength={3} 
                    autoCapitalize="none"
                    onChangeText={(val) => handleNoOfPersonsChange(val)}
                />
                {data.checkNoOfPersonsChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>  

            { data.isValidNoofPersons ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Number of persons must not be empty.</Text>
            </Animatable.View>
            }


            <View style={styles.checkboxContainer}>
                <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                />
                <Text style={styles.label}>Advance paid</Text>
            </View>
            <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>     


            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
            </Animatable.View>
            }

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {signUpHandle(data.fullName,data.email, data.username,data.password
                    ,data.aadharId, data.mobileNo, data.address,data.actualPrice,data.price,isSelected
                    ,data.noOfPersons,data.balanceAmount,route.params?.buildingId,route.params?.buildingFloorId,route.params?.roomId)}}
                >
                <LinearGradient
                    colors={['#000000', '#000000']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default TenantSignUp;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#000000'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
  });
