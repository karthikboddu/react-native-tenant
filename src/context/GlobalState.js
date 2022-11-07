import AllInOneSDKManager from 'paytm_allinone_react-native';
//import { Popup } from 'popup-ui';
import React, { createContext, useReducer } from 'react';
import { CONSTANTS } from '../constants';
import { showToast } from '../helpers/ToastMessageHelper';
import {
    getUserActivityDetailsFromToken, getUserDetailsFromToken,
    login, logout, ssoLogin, updateUserDetailsFromToken, verifyAccessToken, verifyRefreshToken
} from '../services/auth';
import deviceStorage from '../services/deviceStorage';
import { getTasksList } from '../services/tasks';
import { bulkInitTenantOrderPayment, saveOrderDetailsAndComplete } from '../services/tenant/orderService';
import { unlinkTenantRoomContract } from '../services/tenant/roomService';
import {
    createTenantAndToRoom, generatePaytmToken, getRecentAllTenantsRoomOrderDetails, getTenantList, getTenantRoomDetails, getTenantSettings, initTenantRoomPayment, listFloorsByBuildingsId, listRoomDetailsByRoomId,
    listRoomsByFloorId, listTenantBuildings, listTenantBuildingsById, updatePaymentDetails
} from '../services/tenant/tenantService';
import { uploadTenantAsset } from '../services/tenant/uploadService';
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
    updateTenantRoomContract : [],
    createTenantAddToRoomContractList : [],
    tenantSettingsList: [],
    createOrderDetailsAndComplete : [],
    skeletonLoading: false,
    isHeaderVisible: true,
    isTransParentStatusBar : false,
    tenantDetailsList : [],
    bulkTenantRoomPayment :[]
};

export const GlobalContext = createContext(initialLoginState);

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialLoginState);


   async function getTodoTasks() {
    try {
        setScreenLoading(true);
        const response = await getTasksList();
        let res = await response.json();
        dispatch({
            type: 'GET_TASKS',
            payload: res
        });
    } catch (err) {
        console.log(err)
        showToast('error', 'Oops, Something went wrong ...')
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
                    deviceStorage.saveKey("tenant_token", res.data.accessToken);
                    setTransparentStatus(true)
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
                showToast('error', 'Invalid username or password.')
            }

        } catch (err) {
            console.log(err)
            showToast('error', 'Oops, Something went wrong ...')
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
                setScreenLoading(false);
                dispatch({
                    type: 'SIGN_IN',
                    payload: null
                });
                showToast('error', 'Invalid username or password.')
            }

        } catch (err) {
            showToast('error', 'Oops, Something went wrong ...')
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
            showToast('error', 'Oops, Something went wrong ...')
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

            let auth = null;
            if (res != null) {

                const refreshToken = await deviceStorage.loadJWT('refresh_token');

                let response = await verifyAccessToken(res);
                let result = await response.json();

                if (result.status == 200) {
                    auth = res;
                    setTransparentStatus(true)
                } else if (refreshToken != null) {
                    showToast('success', 'Session Out !!! , Re authenticating!!')
                    let refreshResponse = await verifyRefreshToken(refreshToken);
                    let resJson = await refreshResponse.json();

                    deviceStorage.saveKey("id_token", resJson.data.accessToken);
                    //                deviceStorage.saveKey("refresh_token", resJson.data.refreshtoken);
                    auth = resJson.data.accessToken;
                }
                if (auth !=null) {
                    setIsAdmin(result.data.isAdmin)
                    // const decode = JWT.decode(res, endpoints.jwtSecret);
                    
                    // if (decode.type == CONSTANTS.userTypeAdmin) {
                    //     setIsAdmin(true)
                    // }
                }            
            }
            dispatch({
                type: 'RETRIEVE_TOKEN',
                payload: auth
            });
        } catch (err) {

            console.log(err)
            showToast('error', 'Oops, Something went wrong ...')
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
            showToast('error', 'Oops, Something went wrong ...')
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
            showToast('error', 'Oops, Something went wrong ...')
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
            dispatch({
                type: 'GET_USER_DETAILS',
                payload: resJson.data
            });
        } catch (error) {
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'GET_USER_DETAILS_ERR',
                payload: error
            });
        }
    }


    async function updateUserDetails(payload) {

        try {
            setScreenLoading(true);
            const res = await deviceStorage.loadJWT();

            let userResponse = await updateUserDetailsFromToken(res, payload);
            let resJson = await userResponse.json();
            setScreenLoading(false);
            dispatch({
                type: 'PATCH_USER_DETAILS',
                payload: resJson.data
            });
        } catch (error) {
            setScreenLoading(false);
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'PATCH_USER_DETAILS_ERR',
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
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'SET_LOADING_ERR',
                payload: error
            });
        }
    }
    async function setSkeletionLoading(skeletonLoading) {
        try {
            dispatch({
                type: 'SET_SKELETON_LOADING',
                payload: skeletonLoading
            });
        } catch (error) {
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'SET_SKELETON_LOADING_ERR',
                payload: error
            });
        }
    }

    async function setHeaderVisible(isHeaderVisible) {
        try {
            dispatch({
                type: 'SET_HEADER_VISIBLE',
                payload: isHeaderVisible
            });
        } catch (error) {
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'SET_HEADER_VISIBLE_ERR',
                payload: error
            });
        }
    }

    async function setTransparentStatus(isTransParentStatusBar) {
        try {
            dispatch({
                type: 'SET_TRANSPARENET_STATUS_BAR',
                payload: isTransParentStatusBar
            });
        } catch (error) {
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'SET_TRANSPARENET_STATUS_BAR_ERR',
                payload: error
            });
        }
    }
    
    async function setScreenLoading(screenLoading) {
        try {
            dispatch({
                type: 'SET_SCREENLOADING',
                payload: screenLoading
            });
        } catch (error) {
            showToast('error', 'Oops, Something went wrong ...')
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
            showToast('error', 'Oops, Something went wrong ...')
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
            showToast('error', 'Oops, Something went wrong ...')
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
                payload: resJson.data
            });
        } catch (error) {
            setScreenLoading(false);
            console.log(error)
            showToast('error', 'Oops, Something went wrong ...')
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
            dispatch({
                type: 'GET_TENANTBUILDING_BYID_LIST',
                payload: resJson
            });
        } catch (error) {
            console.log(error)
            setScreenLoading(false);
            showToast('error', 'Oops, Something went wrong ...')
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
            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_BYID_LIST',
                payload: resJson
            });
        } catch (error) {
            console.log(error)
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_BYID_LIST_ERR',
                payload: error
            });
        }
    }

    async function getTenantRoomsByFloorId(floorId) {
        try {

            const res = await deviceStorage.loadJWT();
            setSkeletionLoading(true);
            let tenantBuildingsFloorRoomsDetails = await listRoomsByFloorId(res, floorId);

            let resJson = await tenantBuildingsFloorRoomsDetails.json();
            setSkeletionLoading(false)
            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_ROOM_BYID_LIST',
                payload: resJson.data
            });
        } catch (error) {
            setSkeletionLoading(false)
            console.log(error)
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_ROOM_BYID_LIST_ERR',
                payload: error
            });
        }
    }

    async function getTenantRoomsDetailsByRoomId(roomId, query='') {
        try {

            const res = await deviceStorage.loadJWT();

            setSkeletionLoading(true)
            let tenantBuildingsFloorRoomsDetails = await listRoomDetailsByRoomId(res, roomId, query);

            let resJson = await tenantBuildingsFloorRoomsDetails.json();
            setSkeletionLoading(false)

            dispatch({
                type: 'GET_TENANTBUILDINGFLOOR_ROOM_BYROOMID_LIST',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            setSkeletionLoading(false);
            showToast('error', 'Oops, Something went wrong ...')
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
            dispatch({
                type: 'GET_TENANT_PAYTM_TOKEN',
                payload: resJson.data?.body?.txnToken
            });
        } catch (error) {
            console.log(error)
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'GET_TENANT_PAYTM_TOKEN_ERR',
                payload: error
            });
        }
    }
    
    async function startPaytmTransaction(orderId,amount,txnToken, buildingId, oldBuildingAmount) {
        try {
            const res = await deviceStorage.loadJWT();
            const settingsList = await getTenantSettings(res);
            let resJson = await settingsList.json();
            let paytmSettings = resJson.data.paytmPaymentSettings;
                AllInOneSDKManager.startTransaction(
                    orderId,
                    paytmSettings.merchantId,
                    txnToken,
                    amount.toFixed(2),
                    paytmSettings.callBackUrl + orderId,
                    true,
                    true,
                    paytmSettings.urlScheme
                )
                    .then((result) => {
                        setScreenLoading(false);
                        //successPopup();
                        if (result.RESPCODE = CONSTANTS.RESPCODE) {
                            updatePaytmPaymentDetails(orderId, "C", result, buildingId, oldBuildingAmount, amount)
                        } else {
                            updatePaytmPaymentDetails(orderId, "F", result, buildingId, oldBuildingAmount, amount)
                        }
                        getTenantRoomOrderDetails('P,F',1)
                        dispatch({
                            type: 'START_PAYTM_TRANSACTION',
                            payload: result
                        });
                    })
                    .catch((err) => {
                        setScreenLoading(false);
                        //failedPopup()
                        getTenantRoomOrderDetails('P,F',1)
                        updatePaytmPaymentDetails(orderId, "F",'',buildingId, 0, 0)
                        console.log("gateway error", err);
                    });

        } catch (error) {
            setScreenLoading(false);
            //failedPopup()
            console.log(error.message)
            updatePaytmPaymentDetails(orderId, "F", '',buildingId, 0, 0)
            getTenantRoomOrderDetails('P,F',1)
            showToast('error', 'Oops, Something went wrong ...')
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
              const res = await deviceStorage.loadJWT();

              updatePaymentDetails(res, raw);
    }

    async function getTenantRoomOrderDetails(params, page) {
        try {
            setScreenLoading(true);
            const res = await deviceStorage.loadJWT();


            let tenantBuildingsOrderRoomsDetails = await getTenantRoomDetails(res, params, page);

            let resJson = await tenantBuildingsOrderRoomsDetails.json();
            setScreenLoading(false);
            dispatch({
                type: 'GET_TENANT_ORDER_ROOM_LIST',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            setScreenLoading(false);
            showToast('error', 'Oops, Something went wrong ...')
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
            let tenantBuildingsAllOrderRoomsDetails = await getRecentAllTenantsRoomOrderDetails( params, page);

            let resJson = await tenantBuildingsAllOrderRoomsDetails.json();
            setScreenLoading(false);
            dispatch({
                type: 'GET_TENANT_ORDER_ROOM_ALL_LIST',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            setScreenLoading(false);
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'GET_TENANT_ORDER_ROOM_LIST_ALL_ERR',
                payload: error
            });
        }
    }       


    async function initTenantRoomOrderPayment(payload, query='') {
        try {

            const res = await deviceStorage.loadJWT();
            let initPaymentRoomsDetails = await initTenantRoomPayment(res, payload, query);

            let resJson = await initPaymentRoomsDetails.json();
            setScreenLoading(false);
            getTenantRoomOrderDetails('P,F', 1);
            if  (resJson.status == 200) {
                showToast('success', 'Room Payment Added. ')
            } else {
                showToast('error', resJson.message ? resJson.message : 'Tenant Payment failed .. ')
            }
            dispatch({
                type: 'POST_INIT_TENANT_ORDER_ROOM_PAYMENT',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'POST_INIT_TENANT_ORDER_ROOM_PAYMENT_ERR',
                payload: error
            });
        }
    }

    async function unLinkTenantRoomContract(payload) {
        try {
            setScreenLoading(true);
            const res = await deviceStorage.loadJWT();
            let updateTenantRoomContract = await unlinkTenantRoomContract(res, payload);

            let resJson = await updateTenantRoomContract.json();
            if (resJson.status == 200) {
                showToast('success', 'Tenant Unlinked Successfully. ')
            }
            setScreenLoading(false);
            getTenantRoomOrderDetails('P,F', 1);

            dispatch({
                type: 'PATCH_UPDATE_TENANT_ROOM_CONTRACT',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            setScreenLoading(false);
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'PATCH_UPDATE_TENANT_ROOM_CONTRACT_ERR',
                payload: error
            });
        }
    }


    async function createTenantAddToRoomOrderPayment(payload, fileFormData) {
        try {
            setScreenLoading(true)
            const res = await deviceStorage.loadJWT();

            let tenantDetails = await createTenantAndToRoom(res, payload);
            
            let resJson = await tenantDetails.json();

            if(resJson.status == 200) { 
                if (fileFormData !=null || fileFormData != 'undefined ' || resJson.data.tenant_id) {
                    let uploadDetails = await uploadTenantAsset( fileFormData, resJson.data.tenant_id, 'identity');
                    let uploadJson = await uploadDetails.json();
                } 
                showToast('success', 'Tenant Added Successfully. ')
            } else {
                showToast('error', resJson.message ? resJson.message : 'Tenant creation failed .. ')
            }

            getTenantRoomOrderDetails('P,F', 1);
            setScreenLoading(false);
            dispatch({
                type: 'POST_CREATE_TENANT_ORDER_ROOM_PAYMENT',
                payload: resJson.data
            });
        } catch (error) {
            setScreenLoading(false);
            console.log(error)
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'POST_CREATE_TENANT_ORDER_ROOM_PAYMENT_ERR',
                payload: error
            });
        }
    }


    async function getTenantSettigsDetails() {
        try {
            setScreenLoading(true);
            const res = await deviceStorage.loadJWT('tenant_token');
            let tenantSettingsDetails = await getTenantSettings(res);

            let resJson = await tenantSettingsDetails.json();
            setScreenLoading(false);
            
            dispatch({
                type: 'GET_TENANT_SETTINGS_LIST',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            setScreenLoading(false);
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'GET_TENANT_SETTINGS_LIST_ERR',
                payload: error
            });
        }
    } 


    async function createRoomOrderPaymentAndComplete(payload) {
        try {
            
            setScreenLoading(true);
            let tenantDetails = await saveOrderDetailsAndComplete(payload);

            let resJson = await tenantDetails.json();
            setScreenLoading(false);
            getTenantRoomOrderDetails('P,F', 1);
            if(resJson.status == 200) { 
                showToast('success', 'Room Payment Updated .')
            }
            dispatch({
                type: 'POST_CREATE_ORDER_ROOM_PAYMENT_COMPLETE',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'POST_CREATE_ORDER_ROOM_PAYMENT_COMPLETE_ERR',
                payload: error
            });
        }
    }



    async function fetchAllTenantList() {
        try {
            
            setScreenLoading(true);
            let tenantDetails = await getTenantList();
            
            let resJson = await tenantDetails.json();
            
            setScreenLoading(false);

            dispatch({
                type: 'GET_TENANT_LIST',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'GET_TENANT_LIST_ERR',
                payload: error
            });
        }
    }    

   

    async function bulkInitTenantRoomPayment() {
        try {
            let tenantRoomPayment = await bulkInitTenantOrderPayment();

            let resJson = await tenantRoomPayment.json();
            dispatch({
                type: 'BULK_INIT_PAYMENT',
                payload: resJson.data
            });
        } catch (error) {
            console.log(error)
            showToast('error', 'Oops, Something went wrong ...')
            dispatch({
                type: 'BULK_INIT_PAYMENT_ERR',
                payload: error
            });
        }
    }

    return (<GlobalContext.Provider value={{
        error: state.error,
        isLoading: state.isLoading,
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
        getTenantRoomOrderAllDetails,
        updateTenantRoomContract: state.updateTenantRoomContract,
        unLinkTenantRoomContract,
        createTenantAddToRoomContractList: state.createTenantAddToRoomContractList,
        createTenantAddToRoomOrderPayment,
        getTenantSettigsDetails,
        tenantSettingsList : state.tenantSettingsList,
        createOrderDetailsAndComplete: state.createOrderDetailsAndComplete,
        createRoomOrderPaymentAndComplete,
        updateUserDetails,
        skeletonLoading : state.skeletonLoading,
        setSkeletionLoading,
        isHeaderVisible : state.isHeaderVisible,
        setHeaderVisible,
        setTransparentStatus,
        isTransParentStatusBar : state.isTransParentStatusBar,
        tenantDetailsList : state.tenantDetailsList,
        fetchAllTenantList,
        bulkInitTenantRoomPayment,
        bulkTenantRoomPayment: state.bulkTenantRoomPayment
    }}>
        {children}
    </GlobalContext.Provider>);

}
