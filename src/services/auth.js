import axios from 'axios';
import { Alert } from 'react-native';
import endpoints from '../endpoints';
import deviceStorage from './deviceStorage';

const API_URL = endpoints.apiUrl;

function register(payload) {

    try {
        // NOTE Post to HTTPS only in production
        axios.post(`${API_URL}${'/api/auth/signup'}`, payload,)
            .then((response) => {
                deviceStorage.saveKey("id_token", response.accessToken);
                //this.props.newJWT(response.data.jwt);
            })
            .catch((error) => {
                console.log(error.message);
                //this.onRegistrationFail();
            });
    } catch (error) {
        console.log('Register Error: ' + error.message);
    }
}

async function login(payload) {

    try {
        console.log(payload,"login",API_URL)
        let response = await fetch(`${API_URL}` + `${endpoints.tenantLogin}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong, login .', e.message);
        throw handler(e);
    }
}

async function ssoLogin(payload) {

    try {
        let response = await fetch(`${API_URL}` + `${endpoints.ssoLogin}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong, ssoLogin.', e.message);
        throw handler(e);
    }
}

function logout() {
    try {
        deviceStorage.deleteJWT('refresh_token')
        return deviceStorage.deleteJWT();
    } catch (error) {
        Alert.alert('Sorry, something went wrong.', error.message);
        console.log('login Error: ' + error.message);
    }
}

async function verifyAccessToken(token) {
    try {
        const payload = {
            accessToken: token
        }
        console.log(payload,"payload")
        let response = await fetch(`${API_URL}` + `${endpoints.verifyAccessToken}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong, verifyAccessToken.', e.message);
        throw handler(e);
    }
}

async function verifyRefreshToken(token) {
    try {
        const payload = {
            refreshToken: token
        }
        let response = await fetch(`${API_URL}` + `${endpoints.refreshToken}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong, verifyRefreshToken.', e.message);
        throw handler(e);
    }
}

async function getUserDetailsFromToken(accessToken) {

    try {
        let response = await fetch(`${API_URL}` + `${endpoints.getUserDetails}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (error) {
        Alert.alert('Sorry, something went wrong, getUserDetailsFromToken.', error.message);
        throw handler(error);
    }

}

async function getUserActivityDetailsFromToken(accessToken) {

    try {
        let response = await fetch(`${API_URL}` + `${endpoints.getUserLoginInfo}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (error) {
        Alert.alert('Sorry, something went wrong, getUserActivityDetailsFromToken.', error.message);
        throw handler(error);
    }

}

export {
    register,
    login,
    ssoLogin,
    logout,
    verifyAccessToken,
    verifyRefreshToken,
    getUserDetailsFromToken,
    getUserActivityDetailsFromToken
}