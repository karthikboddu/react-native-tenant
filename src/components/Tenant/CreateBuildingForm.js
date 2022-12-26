import { LinearGradient } from 'expo-linear-gradient'
import mime from "mime"
import React, { useContext, useState } from 'react'
import { Alert, ImageBackground, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import colors from '../../assets/colors/colors'
import { GlobalContext } from '../../context/GlobalState'
import { pickImage, pickProfileImage } from '../../helpers/firebase'
import { IconToggle } from '../../utils'
import { Loading } from '../common'

const CreateBuildingForm = ({navigation}) => {

    const { setScreenLoading, screenLoading, createTenantNewBuilding, creatNewBuilding ,userDetails} = useContext(GlobalContext);
    const [image, setImage] = useState(null);
    const [buildingImage, setBuildingImage] = useState('');
    
    const [disable, setDisable] = useState(false);

    const [data, setData] = React.useState({
        buildinName: '',
        buildingImage: '',
        buildingAddress: '',
        noOfFloors: 0,
        noOfRooms: 0,
        totalAmount: 0,
        checkBuildginNameTextInputChange: false,
        checkBuildginAddressTextInputChange: false,
        checkNoOfFloorsTextInputChange: false,
        checkNoOfRoomsTextInputChange: false,
        secureTextEntry: true,
        isValidBuildingName: true,
        isValidBuildingAddress: true,
        isValidNoOfFloors: true,
        isValidNoOfRooms: true
    });

    const textBuildingNameInputChange = (val) => {

        if (val.trim().length >= 4) {
            setData({
                ...data,
                buildinName: val,
                checkBuildginNameTextInputChange: true,
                isValidBuildingName: true
            });
        } else {
            setData({
                ...data,
                buildinName: val,
                checkBuildginNameTextInputChange: false,
                isValidBuildingName: false
            });
        }
    }

    const textBuildingAddressChange = (val) => {
        if (val.trim().length >= 2) {
            setData({
                ...data,
                buildingAddress: val,
                checkBuildginAddressTextInputChange: val,
                isValidBuildingAddress: true
            });
        } else {
            setData({
                ...data,
                buildingAddress: val,
                checkBuildginAddressTextInputChange: val,
                isValidBuildingAddress: false
            });
        }
    }

    const textBuildingNoOfFloorsChange = (val) => {
        if (val.trim().length >= 0) {
            setData({
                ...data,
                noOfFloors: val,
                checkNoOfFloorsTextInputChange: val,
                isValidNoOfFloors: true
            });
        } else {
            setData({
                ...data,
                noOfFloors: val,
                checkNoOfFloorsTextInputChange: val,
                isValidNoOfFloors: false
            });
        }
    }

    const textBuildingNoOfRoomsChange = (val) => {
        if (val.trim().length >= 0) {
            setData({
                ...data,
                noOfRooms: val,
                checkNoOfRoomsTextInputChange: val,
                isValidNoOfRooms: true
            });
        } else {
            setData({
                ...data,
                noOfRooms: val,
                checkNoOfRoomsTextInputChange: val,
                isValidNoOfRooms: false
            });
        }
    }


    const handleValidBuildinName = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidBuildingName: true
            });
        } else {
            setData({
                ...data,
                isValidBuildingName: false
            });
        }
    }

    const handleValidBuildingAddress = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidBuildingAddress: true
            });
        } else {
            setData({
                ...data,
                isValidBuildingAddress: false
            });
        }
    }

    const handleValidNoOfFloors = (val) => {
        if (val.trim().length >= 0) {
            setData({
                ...data,
                isValidNoOfFloors: true
            });
        } else {
            setData({
                ...data,
                isValidNoOfFloors: false
            });
        }
    }

    const handleValidNoOfRooms = (val) => {
        if (val.trim().length >= 0) {
            setData({
                ...data,
                isValidNoOfRooms: true
            });
        } else {
            setData({
                ...data,
                isValidNoOfRooms: false
            });
        }
    }

    const createBuilding = async (buildingName, buildingAddress, noOfFloors, noOfRooms, totalAmount) => {
        const payload = {
            buildingName,
            buildingAddress,
            noOfFloors,
            noOfRooms,
            buildingImage,
            totalAmount
        }

        if ( buildingName.length == 0 || buildingAddress.length == 0 || noOfFloors ==0 ||
            noOfRooms ==0 || buildingImage.length ==0  || !buildingImage ) {
            Alert.alert('Wrong Input!', 'Some fields cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }



        const fileFormData = new FormData();
        if (image) {
            const newImageUri = "file:///" + image.uri.split("file:/").join("");


            let str = image.uri.replace('///', '//')
            fileFormData.append('photos', {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: image.uri.split('/').pop()
            });
        }
        console.log(payload)
        
        await createTenantNewBuilding(JSON.stringify(payload), fileFormData, userDetails._id);

        if (!screenLoading) {
            //navigation.goBack();
            console.log(creatNewBuilding)
            navigation.navigate('BuildingDetails', {
                items: creatNewBuilding._id,
            })
        }
    }

    const takePhotoFromCamera = async () => {
        let result = await pickImage();
        const imageUri = Platform.OS === 'ios' ? result.sourceURL : result.uri;
        if (!result.cancelled) {
            setImage(result);
            setBuildingImage(imageUri);
            setDisable(true)
        }
    };

    const pickImageFromGallery = async () => {
        // No permissions request is necessary for launching the image library
        let result = await pickProfileImage();
        const imageUri = Platform.OS === 'ios' ? result.sourceURL : result.uri;
    
        if (!result.cancelled) {
            setImage(result);
            setBuildingImage(imageUri);
            setDisable(true)
        }
      };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Create new building</Text>
            </View>
            
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Building Name</Text>
                <View style={styles.action}>
                    <IconToggle
                        set="FontAwesome"
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Building Name"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textBuildingNameInputChange(val)}
                        onEndEditing={(e) => handleValidBuildinName(e.nativeEvent.text)}
                    />
                    {data.checkBuildginNameTextInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <IconToggle
                                set="Feather"
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidBuildingName ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Building Name must be 4 characters long.</Text>
                    </Animatable.View>
                }



                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Building Address</Text>
                <View style={styles.action}>
                    <IconToggle
                        set="FontAwesome"
                        name="address-card"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Building Address"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textBuildingAddressChange(val)}
                        onEndEditing={(e) => handleValidBuildingAddress(e.nativeEvent.text)}
                    />
                    {data.checkBuildginAddressTextInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <IconToggle
                                set="Feather"
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidBuildingAddress ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Building Address must be 4 characters long.</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>No Of Floors</Text>
                <View style={styles.action}>
                    <IconToggle
                        set="FontAwesome"
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="No Of Floors"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        keyboardType='numeric'
                        maxLength={10}
                        autoCapitalize="none"
                        onChangeText={(val) => textBuildingNoOfFloorsChange(val)}
                        onEndEditing={(e) => handleValidNoOfFloors(e.nativeEvent.text)}
                    />
                    {data.checkNoOfFloorsTextInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <IconToggle
                                set="Feather"
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidNoOfFloors ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>No Of Floors greater than 0 characters long.</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>No Of Rooms</Text>
                <View style={styles.action}>
                    <IconToggle
                        set="FontAwesome"
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="No Of Rooms"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        keyboardType='numeric'
                        maxLength={10}
                        autoCapitalize="none"
                        onChangeText={(val) => textBuildingNoOfRoomsChange(val)}
                        onEndEditing={(e) => handleValidNoOfRooms(e.nativeEvent.text)}
                    />
                    {data.checkNoOfRoomsTextInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <IconToggle
                                set="Feather"
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidNoOfRooms ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>No Of Rooms greater than 0 characters long.</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Please Upload Building Image.</Text>
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
                }]}>{image ? image.uri.split('/').pop() : ""}</Text>

                <TouchableOpacity
                    disabled={disable}
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={pickImageFromGallery}>
                    <Text style={styles.buttonTextStyle}>Select File</Text>
                </TouchableOpacity>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { createBuilding(data.buildinName, data.buildingAddress, data.noOfFloors, data.noOfRooms, data.totalAmount) }}
                    >
                        <LinearGradient
                            colors={['#212426', '#212426']}
                            style={styles.signIn}
                        >
                            {!screenLoading ?
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Submit</Text>
                                :
                                <Loading size={'large'} />
                            }

                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
            
        </View>
    )
}

export default CreateBuildingForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom : 100
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
})