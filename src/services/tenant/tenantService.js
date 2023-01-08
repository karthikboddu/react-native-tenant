import endpoints from "../../endpoints";
import deviceStorage from "../deviceStorage";

const API_URL = endpoints.apiUrl;

async function listTenantBuildings(accessToken, tenantId) {
    try {
        let url = `${API_URL}`+`${endpoints.tenantBuildings}`
        let query = ''
        if (tenantId) {
            query =  query + '?tenantId=' + tenantId
        }

        let response = await fetch(url + query, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}

async function listTenantBuildingsById(accessToken,buildingId) {
    try {
        let url = `${API_URL}` + `${endpoints.tenantBuildingsById}`;
        let response = await fetch(url.replace('#',buildingId), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}

async function listFloorsByBuildingsId(accessToken,buildingId) {
    try {
        let url = `${API_URL}` + `${endpoints.listFloorsByBuildingsId}`;
        let response = await fetch(url.replace('#',buildingId), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}

async function listRoomsByFloorId(accessToken,floorId) {
    try {
        let url = `${API_URL}` + `${endpoints.listRoomsDetailsByFloorId}`;
        let response = await fetch(url.replace('#',floorId), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}


async function listRoomDetailsByRoomId(accessToken,roomId, query) {
    try {
        let url = `${API_URL}` + `${endpoints.fetchRoomsDetailsByRoomId}` + query;
        let response = await fetch(url.replace('#',roomId), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}

async function generatePaytmToken(accessToken1='', payload) {

    try {
        const accessToken = await deviceStorage.loadJWT();
        let response = await fetch(`${API_URL}` + `${endpoints.generatePaytmToken}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body: payload
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong.', e.message);
        throw handler(e);
    }
}

async function getTenantRoomDetails( accessToken, params, page) {

    try {

        let response = await fetch(`${API_URL}` + `${endpoints.tenantRoomDetails}` + `?paymentStatus=` + `${params}` + `&page=` + `${page}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong.', e.message);
        throw handler(e);
    }
}

async function updatePaymentDetails(accessToken, payload) {

    try {

        let response = await fetch(`${API_URL}` + `${endpoints.updatePaymentDetails}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body: payload
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong.', e.message);
        throw handler(e);
    }
}


async function initTenantRoomPayment(accessToken, payload, query='') {

    try {

        let response = await fetch(`${API_URL}` + `${endpoints.initRoomPayment}` + query, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body: payload
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong.', e.message);
        throw handler(e);
    }
}

async function getTenantRoomAllOrderDetails( accessToken, params, page) {

    try {

        let response = await fetch(`${API_URL}` + `${endpoints.tenantRoomOrderDetails}` + `?paymentStatus=` + `${params}` + `&page=` + `${page}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong.', e.message);
        throw handler(e);
    }
}

async function getRecentAllTenantsRoomOrderDetails (params, page) {

    try {


      const res = await deviceStorage.loadJWT();
      let response = await fetch(`${API_URL}` + `${endpoints.recentAllTenantsRoomOrderDetails}` + `?page=` + `${page}` + `&size=` + `${5}` + params, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': res
        }
      });
      return response;
    } catch (e) {
      console.log(e)
      Alert.alert('Sorry, something went wrong.', e.message);
    }
  }


  async function createTenantAndToRoom(accessToken, payload) {

    try {
        let response = await fetch(`${API_URL}` + `${endpoints.addTenantToRoom}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body: payload
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong.', e.message);
        throw handler(e);
    }
}


async function getTenantSettings(accessToken) {

    try {

        let response = await fetch(`${API_URL}` + `${endpoints.settings}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong.', e.message);
        throw handler(e);
    }
}

async function getTenantList() {

    try {
        const accessToken = await deviceStorage.loadJWT();
        let response = await fetch(`${API_URL}` + `${endpoints.tenantsList}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong.', e.message);
        throw handler(e);
    }
}

async function updateTenantDetailsFromParams(tenantId, payload) {

    try {
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.updateTenantDetails}`;
        
        let response = await fetch(url.replace('#',tenantId), {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body : payload
        });
        return response;
    } catch (error) {
        Alert.alert('Sorry, something went wrong, getUserDetailsFromToken.', error.message);
        throw handler(error);
    }

}

async function createParentTenant(payload) {

    try {
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.createParentTenant}`;
        
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body : payload
        });
        return response;
    } catch (error) {
        Alert.alert('Sorry, something went wrong, getUserDetailsFromToken.', error.message);
        throw handler(error);
    }

}

async function getParentTenantList() {

    try {
        const accessToken = await deviceStorage.loadJWT();
        let response = await fetch(`${API_URL}` + `${endpoints.listParentTenants}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong.', e.message);
        throw handler(e);
    }
}

export {
    listTenantBuildings,
    listTenantBuildingsById,
    listFloorsByBuildingsId,
    listRoomsByFloorId,
    listRoomDetailsByRoomId,
    generatePaytmToken,
    getTenantRoomDetails,
    updatePaymentDetails,
    initTenantRoomPayment,
    getTenantRoomAllOrderDetails,
    getRecentAllTenantsRoomOrderDetails,
    createTenantAndToRoom,
    getTenantSettings,
    getTenantList,
    updateTenantDetailsFromParams,
    createParentTenant,
    getParentTenantList
};
