const endpoints = {
    apiUrl : 'https://nodejs-authtest.herokuapp.com',
    tenantLogin : '/api/tenant/login',
    ssoLogin : '/api/tenant/SSOLogin',
    verifyAccessToken : '/api/auth/verifyAccessToken',
    refreshToken : '/api/auth/refresh-token',
    getUserDetails: '/api/user/userDetails',
    updatetUserDetails: '/api/tenant/tenant',
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
    settings : '/api/tenant/settings',
    createOrderAndComplete : '/api/order/createOrderAndComplete',
    saveConversations : '/api/chat/chats',
    listConversationsByTenantId : '/api/chat/chats/#',
    listAllLastConversationsByTenantId : '/api/chat/conversations',
    listNotes : '/api/tutorials',
    jwtSecret : "karthik-secret-key"

}

export default endpoints;