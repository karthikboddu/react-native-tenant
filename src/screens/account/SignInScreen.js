// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
//import * as Google from 'expo-auth-session/providers/google';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import {
    Alert, Image, Keyboard, Platform,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../assets/colors/colors';
import { Loading } from '../../components/common';
import { GlobalContext } from '../../context/GlobalState';


const SignInScreen = (navigation) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const [state, setState] = React.useState({
        email: '',
        password: '',
        message: '',
        error: '',
        loading:false
      })
    const { colors } = useTheme();
    

    const { allstate,signIn,ssoLogIn, setScreenLoading,screenLoading,
        tenantSettingsList, getTenantSettigsDetails, setTransparentStatus } = useContext(GlobalContext);

    React.useEffect(() => {
        // if (response?.type === 'success') {
        //   const { authentication } = response;
        //   setAccessTokenGoogle(response.authentication.accessToken);
        //   getUserData(response.authentication.accessToken);
        // }
        //   GoogleSignin.configure({
        //     webClientId: '474733627251-bpov4509muv7285kmmqevf0ocebe5vk0.apps.googleusercontent.com'
        //   });
        setTransparentStatus(false)
      }, []);        

    const textInputChange = (val) => {

        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = async(username, password) => {

        const payload = {
            username,
            password
        }
        if ( username.length == 0 || password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        //setScreenLoading(true)
        Keyboard.dismiss();
        await signIn(payload);
        
       
    }

    const [accessTokenGoogle, setAccessTokenGoogle] = React.useState();
    const [userInfoGoogle, setUserInfoGoogle] = React.useState();
    const [message, setMessage] = React.useState();
  

    //const [request, response, promptAsync] = Google.useAuthRequest({
    //   expoClientId: tenantSettingsList.googleSettings.expoClientId,
    //   iosClientId: tenantSettingsList.googleSettings.iosClientId,
    //  androidClientId: tenantSettingsList.googleSettings ? tenantSettingsList.googleSettings.androidClientId : '123',
    //  webClientId: tenantSettingsList.googleSettings ? tenantSettingsList.googleSettings.webClientId : '123',
   // });

    // async function onGoogleButtonPress() {
    //     // Get the users ID token
    //     const {user} = await GoogleSignin.signIn();      
    //     // Create a Google credential with the token
    //     // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //     if (user) {
    //         setAccessTokenGoogle(user);
    //         sooLoginHandle(user.name,user.id, user.email, user.photo);
    //     }
    //     // Sign-in the user with the credential
    //     // return auth().signInWithCredential(googleCredential);
    //   }

    async function getUserData(token) {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${token}`}
        });
    
        userInfoResponse.json().then(data => {
          setUserInfoGoogle(data);
          sooLoginHandle(data.name,data.id, data.email, data.picture);
        });
      }
    
      function showUserInfo() {
        if (userInfoGoogle) {
          return (
            <View style={styles.userInfo}>
              <Image source={{uri: userInfoGoogle.picture}} style={styles.profilePic} />
              <Text>Welcome {userInfoGoogle.name}</Text>
              <Text>{userInfoGoogle.email}</Text>
            </View>
          );
        }
      }


      const sooLoginHandle = async(fullName, username,email, photoUrl) => {

        const payload = {
            fullName,
            email,
            username,
            photoUrl
        }
        if ( username.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        //setScreenLoading(true)
        await ssoLogIn(payload);
        
       
    }

    return (
        
      <View style={styles.container}>
     {/* <Overlay isShow={screenLoading} /> */}
       {/*     <StatusBar backgroundColor='#009387' barStyle="light-content"/> */}
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
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
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
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
            

            {/* <ForgotPassword navigatte = {navigation}/> */}
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle( data.username, data.password )}}
                >
                <LinearGradient
                    colors={['#212426', '#212426']}
                    style={styles.signIn}
                >
                    {!screenLoading ?
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                    :
                        <Loading size={'large'} />
                    }
                    
                </LinearGradient>
                </TouchableOpacity>
                {false ? (
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#212426',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#212426'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
                ) : null}
                {false ? (
                    {/* <GoogleSigninButton
                style={{ width: 192, height: 70 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                /> */}
              
                ) : null}
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

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
        flex: 3,
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
    }
  });
