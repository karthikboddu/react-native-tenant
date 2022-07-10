const endpoints = {
    apiUrl : 'https://nodejs-authtest.herokuapp.com',
    tenantLogin : '/api/tenant/login',
    ssoLogin : '/api/tenant/SSOLogin',
    verifyAccessToken : '/api/auth/verifyAccessToken',
    refreshToken : '/api/auth/refresh-token',
    getUserDetails: '/api/user/userDetais',
    getUserLoginInfo: '/api/user/userLoginInfo',
    tenantBuildings : '/api/building/buildings',
    tenantBuildingsById : '/api/building/buildings/#',
    listFloorsByBuildingsId: '/api/floor/floors/#',
    listRoomsDetailsByFloorId: '/api/floor/roomDetails/#',
    fetchRoomsDetailsByRoomId : '/api/room/roomDetails/#',
    generatePaytmToken: '/api/order/generatePaytmToken',
    tenantRoomDetails: '/api/room/tenantRoomDetails',
    updatePaymentDetails: '/api/order/updateOrder',
    initRoomPayment : '/api/order/initRoomPayment',
    tenantRoomOrderDetails : '/api/order/tenantRoomOrderDetails',
    recentAllTenantsRoomOrderDetails : '/api/order/recentAllTenantRoomOrderDetails',
    updateTenantRoomContract : '/api/room/roomContracts',
    tenantsList : '/api/tenant/tenants',
    addTenantToRoom : '/api/tenant/tenants',
    mId : 'nikYWM52585118708761',
    callBackUrl : 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=',
    urlScheme : 'paytmnikYWM52585118708761',
    jwtSecret : "karthik-secret-key"

}

export default endpoints;