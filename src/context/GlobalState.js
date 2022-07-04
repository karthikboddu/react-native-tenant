import JWT from 'expo-jwt';
import AllInOneSDKManager from 'paytm_allinone_react-native';
// import { Popup } from 'popup-ui';
import React, { createContext, useReducer } from 'react';
import Constants from '../Constants';
import endpoints from '../endpoints';
import { getUserActivityDetailsFromToken, getUserDetailsFromToken, login, logout, ssoLogin, verifyAccessToken, verifyRefreshToken } from '../services/auth';
import deviceStorage from '../services/deviceStorage';
import { showFlashMessage } from '../services/FlashMessageService';
import { getTasksList } from '../services/tasks';
import { generatePaytmToken, getTenantRoomAllOrderDetails, getTenantRoomDetails, initTenantRoomPayment, listFloorsByBuildingsId, listRoomDetailsByRoomId, listRoomsByFloorId, listTenantBuildings, listTenantBuildingsById, updatePaymentDetails } from '../services/tenant/tenantService';
import AppReducer from './AppReducer';


const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    allTasksList: [],
    error: null,
    allstate: null,
    isDarkTheme: false,
    userDetails: [],
    screenLoading: false,
    userLoginActivity: [],
    tenantBuildingList: [],
    tenantBuildingListById: [],
    tenantBuildingFloorList: [],
    tenantBuildingFloorRoomsList: [],
    tenantBuildingFloorRoomsDetails: [],
    txnToken: null,
    isAdmin: false,
    paytmTransactionResponse: [],
    tenantRoomOrderDetails: [],
    tenantRoomOrderDetailsAll: [],
    initRoomOrderPayment : [],
    popupLoading: false,
};

export const GlobalContext = createContext(initialLoginState);

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialLoginState);

    // Actions
    async function getTodoTasks() {
        try {
            setScreenLoading(true);
            const res = await getTasksList();
            dispatch({
                type: 'GET_TASKS',
                payload: res.data
            });
        } catch (err) {
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'TASKS_ERROR',
                payload: err
            });
        }
    }

    async function signIn(payload) {
        try {
            setScreenLoading(true);
            let response = await login(payload)
            let res = await response.json();

            if (res.status == "200") {
                
                if (res.data) {
                    deviceStorage.saveKey("id_token", res.data.accessToken);
                    deviceStorage.saveKey("refresh_token", res.data.refreshtoken);
                    // const decode = JWT.decode(res.data.refreshtoken, endpoints.jwtSecret);
                    const decode = 'user';
                    console.log(res.data, "response")
                    if (res.data.isAdmin) {
                        setIsAdmin(true)
                    }      
                    dispatch({
                        type: 'SIGN_IN',
                        payload: res.data.accessToken
                    });
                }
            } else {
                dispatch({
                    type: 'SIGN_IN',
                    payload: null
                });
                showFlashMessage('Error', 'Invalid username or password.', 'danger', 'danger');
            }

        } catch (err) {
            console.log(err)
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'SIGN_IN_ERROR',
                payload: err
            });
        }
    }


    async function ssoLogIn(payload) {
        try {
            setScreenLoading(true);
            let response = await ssoLogin(payload)
            let res = await response.json();

            if (res.status == "200") {
                console.log(res.status, "response")
                setScreenLoading(false);
                if (res.data) {
                    deviceStorage.saveKey("id_token", res.data.accessToken);
                    deviceStorage.saveKey("refresh_token", res.data.refreshtoken);

                    // const decode = JWT.decode(res.data.refreshtoken, endpoints.jwtSecret);
                    const decode = 'user';            
                    if (res.data.isAdmin) {
                        setIsAdmin(true)
                    }                    
                    dispatch({
                        type: 'SIGN_IN',
                        payload: res.data.accessToken
                    });
                }
            } else {
                dispatch({
                    type: 'SIGN_IN',
                    payload: null
                });
                showFlashMessage('Error', 'Invalid username or password.', 'danger', 'danger');
            }

        } catch (err) {
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'SIGN_IN_ERROR',
                payload: err
            });
        }
    }

    async function signOut() {
        try {
            const res = await logout();
            console.log(res)
            setIsAdmin(false)
            dispatch({
                type: 'LOGOUT',
                payload: res
            });
        } catch (err) {
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'LOGOUT_ERROR',
                payload: err
            });
        }
    }

    async function getUserToken() {
        try {
            // signOut()
            const res = await deviceStorage.loadJWT();
            console.log(res,"eresrtoken")
            let auth = null;
            if (res != null) {

                const refreshToken = await deviceStorage.loadJWT('refresh_token');

                let response = await verifyAccessToken(res);
                let result = await response.json();

                if (result.status == 200) {
                    auth = res;

                } else if (refreshToken != null) {
                    showFlashMessage('Success', 'Session Out !!! , Re authenticating!!', 'success', 'success')
                    let refreshResponse = await verifyRefreshToken(refreshToken);
                    let resJson = await refreshResponse.json();

                    deviceStorage.saveKey("id_token", resJson.data.accessToken);
                    //                deviceStorage.saveKey("refresh_token", resJson.data.refreshtoken);
                    auth = resJson.data.accessToken;
                }
                console.log("6666", res, "\n")
                if (auth !=null) {
                    const decode = JWT.decode(res, endpoints.jwtSecret);
                    
                    if (decode.type == Constants.userTypeAdmin) {
                        setIsAdmin(true)
                        console.log(decode.type,"decoded")
                    }
                }            
            }
            dispatch({
                type: 'RETRIEVE_TOKEN',
                payload: auth
            });
        } catch (err) {

            console.log(err)
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'RETRIEVE_TOKEN_ERR',
                payload: err
            });
        }
    }

    async function setDarkTheme() {
        try {
            dispatch({
                type: 'SET_DARK_THEME',
                payload: true
            });
        } catch (error) {
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'SET_DARK_THEME_ERR',
                payload: err
            });
        }
    }

    async function setIsAdmin(value) {
        try {
            dispatch({
                type: 'SET_USERTYPE_ADMIN',
                payload: value
            });
        } catch (error) {
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'SET_USERTYPE_ADMIN_ERR',
                payload: err
            });
        }
    }


    async function getUserDetails() {

        try {
            const res = await deviceStorage.loadJWT();

            let userResponse = await getUserDetailsFromToken(res);
            let resJson = await userResponse.json();
            console.log(resJson)
            dispatch({
                type: 'GET_USER_DETAILS',
                payload: resJson.data
            });
        } catch (error) {
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'GET_USER_DETAILS_ERR',
                payload: error
            });
        }
    }

    async function setLoading(isLoading) {
        try {
            dispatch({
                type: 'SET_LOADING',
                payload: isLoading
            });
        } catch (error) {
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'SET_LOADING_ERR',
                payload: error
            });
        }
    }

    async function setScreenLoading(isLoading) {
        try {
            dispatch({
                type: 'SET_SCREENLOADING',
                payload: isLoading
            });
        } catch (error) {
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'SET_SCREEN_ERR',
                payload: error
            });
        }
    }

    async function setPopup(popupLoading) {
        try {
            dispatch({
                type: 'SET_POPUP',
                payload: popupLoading
            });
        } catch (error) {
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'SET_POPUP_ERR',
                payload: error
            });
        }
    }

    function successPopup () {

        Popup.show({
          type: 'Success',
          title: 'Payment Success',
          button: true,
          textBody: 'Congrats! Your payment is successfully completed',
          buttonText: 'Ok',
          callback: () => Popup.hide()
        })
     
        }

        function failedPopup () {

                Popup.show({
                type: 'Warning',
                title: 'Payment Failed',
                button: true,
                textBody: 'Payment failed, Please try again',
                buttonText: 'Ok',
                callback: () => Popup.hide()
                })

        }

    async function getUserLoginActivity() {
        try {
            const res = await deviceStorage.loadJWT();
            let activityDetails = await getUserActivityDetailsFromToken(res);
            let resJson = await activityDetails.json();

            dispatch({
                type: 'GET_USERACTIVITY',
                payload: resJson.data
            });
        } catch (error) {
            showFlashMessage('Error', 'Something went wrong !!.', 'danger', 'danger');
            dispatch({
                type: 'GET_USERACTIVITY_ERR',
                payload: error
            });
        }
    }

    async function getTenantBuildings() {
        try {
            setScreenLoading(true);
            const res = await deviceStorage.loadJWT();
            //await logout();

            let tenantBuildingsDetails = await listTenantBuildings(res);
            let resJson = await tenantBuildingsDetails.json();
            setScreenLoading(false);
            dispatch({
                type: 'GET_TENANTBUILDING_LIST',
                payload: resJson
            });
        } catch (error) {
            setScreenLoading(false);
            console.log(error)
            showFlashMessage('Error', error, 'danger', 'danger');
            dispatch({
                type: 'GET_TENANTBUILDING_LIST_ERR',
                payload: error
            });
        }
    }

    async function getTenantBuildingsById(buildingId) {
        try {
            setScreenLoading(true);
            const res = await deviceStorage.loadJWT();
            //await logout();

            let tenantBuildingsDetails = await listTenantBuildingsById(res, buildingId);

            let resJson = await tenantBuildingsDetails.json();
            setScreenLoading(false);
            console.log(resJson, "buildingId")
            dispatch({
                type: 'GET_TENANTBUILDING_BYID_LIST',
                payload: resJson
            });
        } catch (error) {
            console.log(error)
            setScreenLoading(false);
            showFlashMessage('Error', error, 'danger', 'danger');
            dispatch({
                type: 'GET_TENANTBUILDING_BYID_LIST_ERR',
                payload: error
            });
        }
    }

    async function getTenantFloorsBuildingId(buildingId) {
        try {
            const res = await deviceStorage.loadJWT();
            //await logout();

            let tenantBuildingsFloorDetails = await listFloorsByBuildingsId(res, buildingId);

            let resJson = await tenantBuildingsFloorDetails.json();
            console.log(resJson, "FloorId")
            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_BYID_LIST',
                payload: resJson
            });
        } catch (error) {
            console.log(error)
            showFlashMessage('Error', error, 'danger', 'danger');
            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_BYID_LIST_ERR',
                payload: error
            });
        }
    }

    async function getTenantRoomsByFloorId(floorId) {
        try {

            const res = await deviceStorage.loadJWT();
            //await logout();

            let tenantBuildingsFloorRoomsDetails = await listRoomsByFloorId(res, floorId);

            let resJson = await tenantBuildingsFloorRoomsDetails.json();

            console.log(resJson, "Roomid")
            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_ROOM_BYID_LIST',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)

            showFlashMessage('Error', error, 'danger', 'danger');
            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_ROOM_BYID_LIST_ERR',
                payload: error
            });
        }
    }

    async function getTenantRoomsDetailsByRoomId(roomId) {
        try {

            const res = await deviceStorage.loadJWT();
            //await logout();
            setScreenLoading(true)
            let tenantBuildingsFloorRoomsDetails = await listRoomDetailsByRoomId(res, roomId);

            let resJson = await tenantBuildingsFloorRoomsDetails.json();
            setScreenLoading(false)
            console.log(resJson, "Roomid")
            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_ROOM_BYROOMID_LIST',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            setScreenLoading(false);
            showFlashMessage('Error', error, 'danger', 'danger');
            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_ROOM_BYROOMID_LIST_ERR',
                payload: error
            });
        }
    }

    async function clearStateVariable() {
        try {
            dispatch({
                type: 'CLEAR_STATE',
                payload: [],
            });
        } catch (error) {

        }
    }

    async function getPaytmToken(orderId,amount) {
        try {

            var raw = JSON.stringify({
                orderId: orderId,
                amt: amount,
              });
            const res = await deviceStorage.loadJWT();
            //await logout();

            let token = await generatePaytmToken(res, raw);

            let resJson = await token.json();
            console.log(resJson, "paytmtoken")
            dispatch({
                type: 'GET_TENANT_PAYTM_TOKEN',
                payload: resJson.data?.body?.txnToken
            });
        } catch (error) {
            console.log(error)
            showFlashMessage('Error', error, 'danger', 'danger');
            dispatch({
                type: 'GET_TENANT_PAYTM_TOKEN_ERR',
                payload: error
            });
        }
    }
    
    async function startPaytmTransaction(orderId,amount,txnToken, buildingId, oldBuildingAmount) {
        try {
                AllInOneSDKManager.startTransaction(
                    orderId,
                    endpoints.mId,
                    txnToken,
                    amount.toFixed(2),
                    endpoints.callBackUrl + orderId,
                    true,
                    true,
                    endpoints.urlScheme
                )
                    .then((result) => {
                        setScreenLoading(false);
                        // successPopup();
                        if (result.status = Constants.txnSuccess) {
                            console.log(result,"Paytm response")
                            updatePaytmPaymentDetails(orderId, "C", result, buildingId, oldBuildingAmount, amount)
                        } else {
                            updatePaytmPaymentDetails(orderId, "F", result, buildingId, oldBuildingAmount, amount)
                        }
                        getTenantRoomOrderDetails('P,F',1)
                        dispatch({
                            type: 'START_PAYTM_TRANSACTION',
                            payload: result
                        });
                        console.log("gateway response", result);
                    })
                    .catch((err) => {
                        setScreenLoading(false);
                        // failedPopup()
                        getTenantRoomOrderDetails('P,F',1)
                        updatePaytmPaymentDetails(orderId, "F",'',buildingId, 0, 0)
                        console.log("gateway error", err);
                    });

        } catch (error) {
            setScreenLoading(false);
            // failedPopup()
            console.log(error.message)
            updatePaytmPaymentDetails(orderId, "F", '',buildingId, 0, 0)
            getTenantRoomOrderDetails('P,F',1)
            showFlashMessage('Error', error.message, 'danger', 'danger');
            dispatch({
                type: 'START_PAYTM_TRANSACTION_ERR',
                payload: error
            });
        }
    }

    async function updatePaytmPaymentDetails(orderId,orderStatus, result, exisintgBuildingId, oldBuildingAmount, amt) {

            var raw = JSON.stringify({
                orderId: orderId,
                status:  orderStatus,
                paymentResponse : JSON.stringify(result),
                buildingId : exisintgBuildingId,
                buildingAmount: oldBuildingAmount,
                amount : amt
              });
              console.log(raw,"Rwa")
              const res = await deviceStorage.loadJWT();

              updatePaymentDetails(res, raw);
    }

    async function getTenantRoomOrderDetails(params, page) {
        try {
            setScreenLoading(true);
            const res = await deviceStorage.loadJWT();
            //await logout();

            let tenantBuildingsOrderRoomsDetails = await getTenantRoomDetails(res, params, page);

            let resJson = await tenantBuildingsOrderRoomsDetails.json();
            setScreenLoading(false);
            console.log(resJson,"resjson")
            dispatch({
                type: 'GET_TENANT_ORDER_ROOM_LIST',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            setScreenLoading(false);
            showFlashMessage('Error', error, 'danger', 'danger');
            dispatch({
                type: 'GET_TENANT_ORDER_ROOM_LIST_ERR',
                payload: error
            });
        }
    }    

    async function getTenantRoomOrderAllDetails(params, page) {
        try {
            setScreenLoading(true);
            const res = await deviceStorage.loadJWT();
            let tenantBuildingsAllOrderRoomsDetails = await getTenantRoomAllOrderDetails(res, params, page);

            let resJson = await tenantBuildingsAllOrderRoomsDetails.json();
            setScreenLoading(false);
            console.log(resJson,"resjson")
            dispatch({
                type: 'GET_TENANT_ORDER_ROOM_ALL_LIST',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            setScreenLoading(false);
            showFlashMessage('Error', error, 'danger', 'danger');
            dispatch({
                type: 'GET_TENANT_ORDER_ROOM_LIST_ALL_ERR',
                payload: error
            });
        }
    }       


    async function initTenantRoomOrderPayment(payload) {
        try {

            const res = await deviceStorage.loadJWT();
            //await logout();

            let initPaymentRoomsDetails = await initTenantRoomPayment(res, payload);

            let resJson = await initPaymentRoomsDetails.json();
            setScreenLoading(false);
            getTenantRoomOrderDetails('P,F', 1);
            console.log(resJson,"resjson")
            dispatch({
                type: 'POST_INIT_TENANT_ORDER_ROOM_PAYMENT',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            showFlashMessage('Error', error, 'danger', 'danger');
            dispatch({
                type: 'POST_INIT_TENANT_ORDER_ROOM_PAYMENT_ERR',
                payload: error
            });
        }
    }


    return (<GlobalContext.Provider value={{
        error: state.error,
        loading: state.isLoading,
        popupLoading: state.popupLoading,
        setPopup,
        screenLoading: state.screenLoading,
        setScreenLoading,
        setLoading,
        getTodoTasks,
        allTasksList: state.allTasksList,
        signIn,
        ssoLogIn,
        signOut,
        userToken: state.userToken,
        getUserToken,
        allstate: state,
        setDarkTheme,
        userDetails: state.userDetails,
        getUserDetails,
        getUserLoginActivity,
        userLoginActivity: state.userLoginActivity,
        tenantBuildingList: state.tenantBuildingList,
        getTenantBuildings,
        tenantBuildingListById: state.tenantBuildingListById,
        getTenantBuildingsById,
        tenantBuildingFloorList: state.tenantBuildingFloorList,
        getTenantFloorsBuildingId,
        tenantBuildingFloorRoomsList: state.tenantBuildingFloorRoomsList,
        getTenantRoomsByFloorId,
        clearStateVariable,
        tenantBuildingFloorRoomsDetails: state.tenantBuildingFloorRoomsDetails,
        getTenantRoomsDetailsByRoomId,
        txnToken : state.txnToken,
        getPaytmToken,
        isAdmin : state.isAdmin,
        setIsAdmin,
        paytmTransactionResponse: state.paytmTransactionResponse,
        startPaytmTransaction,
        tenantRoomOrderDetails: state.tenantRoomOrderDetails,
        getTenantRoomOrderDetails,
        initRoomOrderPayment: state.initRoomOrderPayment,
        initTenantRoomOrderPayment,
        tenantRoomOrderDetailsAll : state.tenantRoomOrderDetailsAll,
        getTenantRoomOrderAllDetails
    }}>
        {children}
    </GlobalContext.Provider>);

}