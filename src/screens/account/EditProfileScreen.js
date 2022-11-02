import { useActionSheet } from "@expo/react-native-action-sheet";
import mime from "mime";
// import storage from '@react-native-firebase/storage';
import React, { useContext, useState } from 'react';
import { ImageBackground, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import { Loading } from "../../components/common";
import { GlobalContext } from '../../context/GlobalState';
import { pickImage, pickProfileImage } from '../../helpers/firebase';
import { uploadTenantProfileAsset } from "../../services/tenant/uploadService";
import { IconToggle } from "../../utils";
const EditProfileScreen = ({ navigation }) => {

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { colors } = useTheme();
  const { userDetails, updateUserDetails, screenLoading, setScreenLoading, getUserDetails } = useContext(GlobalContext);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  React.useEffect(() => {
    console.log(userDetails)
    setImageUrl(userDetails.photoUrl)
  }, []);



  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Profile Updated Successfully. ',
      position: 'bottom',
      bottomOffset:60,
      config : {}
    });
  }
  
  const pickImageFromGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await pickProfileImage();
    const imageUri = Platform.OS === 'ios' ? result.sourceURL : result.uri;
    setImageUrl(imageUri)
    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const takePhotoFromCamera = async () => {
    let result = await pickImage();
    console.log(result,"image")
    const imageUri = Platform.OS === 'ios' ? result.sourceURL : result.uri;
    setImageUrl(imageUri)

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    // const uploadUri = image;
    // let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // // Add timestamp to File Name
    // const extension = filename.split('.').pop();
    // const name = filename.split('.').slice(0, -1).join('.');
    // filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setScreenLoading(true);
    // setTransferred(0);

    // const storageRef = storage().ref(`photos/${filename}`);
    // const task = storageRef.putFile(uploadUri);

    // // Set transferred state
    // task.on('state_changed', (taskSnapshot) => {
    //   console.log(
    //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    //   );

    //   setTransferred(
    //     Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
    //     100,
    //   );
    // });

    try {
      // await task;

      // const url = await storageRef.getDownloadURL();
      const newImageUri =  "file:///" + image.uri.split("file:/").join("");

      const fileFormData = new FormData();
      fileFormData.append('assets',{
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: image.uri.split('/').pop()
      });
      setUploading(false);
      setImage(null);

      // const payload = {
      //   photoUrl: url
      // }
      // updateUserDetails(JSON.stringify(payload))
      await uploadTenantProfileAsset(fileFormData, 'profile_pic')
      setScreenLoading(true);
      if (!screenLoading) {
        showToast()
        navigation.goBack();
        getUserDetails()
      }

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  const icons = [
    <IconToggle
      set={'fontAwesome'}
      name={'close'}
      size={22}
    />,
    <IconToggle
      set={'fontAwesome'}
      name={'camera'}
      size={22}
    />,
    <IconToggle
      set={'fontAwesome'}
      name={'photo'}
      size={22}
    />
  ];

  const { showActionSheetWithOptions } = useActionSheet();
  const handleActionMenuList = (dataItem) => {
    showActionSheetWithOptions({
      options: ["Cancel", "Open Camera", "Open Gallery"],
      destructiveButtonIndex: 2,
      cancelButtonIndex: 0,
      userInterfaceStyle: 'light',
      icons
    }, buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {

        takePhotoFromCamera()
      } else if (buttonIndex === 2) {

        pickImageFromGallery()
      }
    });
  }

  // bs = React.createRef();
  // fall = new Animated.Value(1);

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


      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={handleActionMenuList}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: imageUrl,
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
          {userDetails.full_name}
        </Text>
      </View>

      {/* <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          editable={false}
          value={userDetails.username}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View> */}
      <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          editable={false}
          value={userDetails.full_name}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <Feather name="phone" color={colors.text} size={20} />
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          editable={false}
          value={userDetails.mobile_no.toString()}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="envelope-o" color={colors.text} size={20} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666666"
          keyboardType="email-address"
          autoCorrect={false}
          editable={false}
          value={userDetails.email}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      {/* <View style={styles.action}>
        <FontAwesome name="globe" color={colors.text} size={20} />
        <TextInput
          placeholder="Country"
          placeholderTextColor="#666666"
          autoCorrect={false}
          editable={false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View> */}
      <View style={styles.action}>
        <Icon name="map-marker-outline" color={colors.text} size={20} />
        <TextInput
          placeholder="Address"
          placeholderTextColor="#666666"
          autoCorrect={false}
          editable={false}
          value={userDetails.address}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <TouchableOpacity style={styles.commandButton} onPress={() => uploadImage()}>
        {!screenLoading ?
          <Text style={styles.panelButtonTitle}>Submit</Text>
          :
          <Loading size={'small'} /> }
      </TouchableOpacity>
    </View>

  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 30,
    marginTop: 40,
    marginBottom: 50,
    marginHorizontal: 100,
    
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
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
    marginLeft:20,
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
});
