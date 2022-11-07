// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { GlobalContext } from '../../context/GlobalState';

const GoogleSignIn = () => {

    React.useEffect(() => {
        // GoogleSignin.configure({
        //     webClientId: '474733627251-bpov4509muv7285kmmqevf0ocebe5vk0.apps.googleusercontent.com'
        // });
    }, []);
    const [accessTokenGoogle, setAccessTokenGoogle] = React.useState();
    const { allstate, signIn, ssoLogIn, setScreenLoading, screenLoading,
        tenantSettingsList, getTenantSettigsDetails } = useContext(GlobalContext);

    async function onGoogleButtonPress() {
        // Get the users ID token
        // const { user } = await GoogleSignin.signIn();
        // // Create a Google credential with the token
        // // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // if (user) {
        //     setAccessTokenGoogle(user);
        //     sooLoginHandle(user.name, user.id, user.email, user.photo);
        // }
        // Sign-in the user with the credential
        // return auth().signInWithCredential(googleCredential);
    }

    const sooLoginHandle = async (fullName, username, email, photoUrl) => {

        const payload = {
            fullName,
            email,
            username,
            photoUrl
        }
        if (username.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        await ssoLogIn(payload);


    }

    return (
        <View style={styles.button}>
            <GoogleSigninButton
                style={{ width: 192, height: 70 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
            />
        </View>
    )
}

export default GoogleSignIn

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        marginTop: 50
    },
})