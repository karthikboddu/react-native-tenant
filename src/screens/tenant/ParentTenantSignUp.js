import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import mime from "mime";
import React, { useState } from 'react';
import { Alert, ImageBackground, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import BackButton from '../../components/BackButton';
import { Loading } from '../../components/common';
import { COLORS } from '../../constants';
import { GlobalContext } from '../../context/GlobalState';
import { getFileInfo, isLessThanTheMB, pickImage, pickProfileImage } from '../../helpers/firebase';

const ParentTenantSignUp = ({route, routeDetails}) => {

    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [disable, setDisable] = useState(false);
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
        startDateOfMonth : 0,
        amountPaid : false,
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
        checkStartDateOfMonth : false,
        checkAmountPaid : false,
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
        isValidStartDateOfMonth: true,
        isValidAmountPaid : true,
        isValidConfirmPassword : true,
        addRoomContract: true
    });

    const [isSelected, setSelection] = useState(false);
    const [amountPaid, setAmountPaid] = useState(false);

    const { screenLoading, setScreenLoading, isAdmin, createParentTenantSuperAdmin,createTenantAddToRoomContractList } = React.useContext(GlobalContext);


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

    const handleStartDateMonthChange = (val) => {
        var dateNow = new Date();
        var lastDate = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0);
        var currentDay = lastDate.getUTCDate();
        if( val > 0 && val <= currentDay) { 

            setData({
                ...data,
                startDateOfMonth : val,
                isValidStartDateOfMonth : true,
                checkStartDateOfMonth : true
            });
        } else {
            setData({
                ...data,
                startDateOfMonth: val,
                isValidStartDateOfMonth : false,
                checkStartDateOfMonth : false
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

    const signUpHandle = async(fullName,email, username,password,aadharId, mobileNo, address,actualPrice,
        price,advancePaid,noOfPersons,balanceAmount, buildingId,buildingFloorId,roomId, addRoomContract, startDateOfMonth, amountPaid) => {
        const payload = {
            fullName,
            email,
            username,
            password,
            aadharId,
            mobileNo,
            address
        }
        if ( username.length == 0 || password.length == 0 || email.length ==0 ||
            fullName.length==0 || mobileNo.length ==0 || address.length ==0  || !image ) {
            Alert.alert('Wrong Input!', 'Some fields cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        const fileFormData = new FormData();
        if (image) {
            const newImageUri =  "file:///" + image.uri.split("file:/").join("");

        
            let str=image.uri.replace('///','//')
            fileFormData.append('photos',{
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: image.uri.split('/').pop()
            });
        }
        setScreenLoading(true);
        createParentTenantSuperAdmin(JSON.stringify(payload), fileFormData, navigation)
        // if (createTenantAddToRoomContractList?.status) {
            // navigation.navigate('TenantRoomDetails')
        // }
        // if (!screenLoading) {
        //     navigation.goBack();
        // }

    }

    const takePhotoFromCamera = async () => {
        let result = await pickImage();
        const imageUri = Platform.OS === 'ios' ? result.sourceURL : result.uri;
        if (!result.cancelled) {
          setImage(result);
          setDisable(true)
        }
    };

    const pickImageFromGallery = async () => {
        // No permissions request is necessary for launching the image library
        let result = await pickProfileImage();
        const imageUri = Platform.OS === 'ios' ? result.sourceURL : result.uri;
        console.log(result);
        const { uri } = result

        const fileInfo = await getFileInfo(result.uri)
       
        const newImageUri =  "file:///" + result.uri.split("file:/").join("");
        const type = mime.getType(newImageUri)
       
        if (!fileInfo?.size) {
            Alert.alert("Can't select this file as the size is unknown.", [
                {text: 'Okay'}
            ]);
            return;
        }

        if (type === 'image/png' || type=== 'image/jpeg' || type === 'image/jpg') {
            console.log(type, "1");
            const isLt15MB = isLessThanTheMB(fileInfo.size, 15)
            if (!isLt15MB) {
              Alert.alert("Image size must be smaller than 15MB!", [
                {text: 'Okay'}
                ]);
              return
            }
        } else {
            console.log(type,"2");
            Alert.alert('Wrong Input!', 'Onlt Images are supported', [
                {text: 'Okay'}
            ]);
              return
        }




        if (!result.cancelled) {
            setImage(result);
            setDisable(true)
        }
      };

    return (
      <View style={styles.container}>
        {/* <Overlay isShow={screenLoading} /> */}
        <BackButton goBack={navigation.goBack}/>

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
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Please Upload Government identity.</Text>
            {image && (
            <ImageBackground
              source={{
                uri: image.uri,
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}>

              </ImageBackground>
              )}
            <Text style={[{
                marginTop: 35
            }]}>{image ? image.uri.split('/').pop(): ""}</Text>
            
            <TouchableOpacity
                disabled={disable}
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={pickImageFromGallery}>
                <Text style={styles.buttonTextStyle}>Select File</Text>
            </TouchableOpacity>

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
                    ,data.noOfPersons,data.balanceAmount,route.params?.buildingId,route.params?.buildingFloorId,route.params?.roomId, data.addRoomContract, data.startDateOfMonth, amountPaid)}}
                >
                <LinearGradient
                    colors={['#000000', '#000000']}
                    style={styles.signIn}
                >
                {!screenLoading ? 
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                    :  <Loading size={'large'} />}
                </LinearGradient>
                </TouchableOpacity>

            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default ParentTenantSignUp;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: COLORS.primary
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
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      },
      checkboxContainer : {
        flexDirection: 'row',
        marginTop:10
      },
      checkBoxLabel: {
          marginLeft :10
      }
  });