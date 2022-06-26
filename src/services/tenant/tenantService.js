import endpoints from "../../endpoints";
import deviceStorage from "../deviceStorage";

const API_URL = endpoints.apiUrl;

async function listTenantBuildings(accessToken) {
    try {
        
        let response = await fetch(`${API_URL}`+`${endpoints.tenantBuildings}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        //  console.log(JSON.stringify(response),"access")
        return response;
    } catch (error) {
        // console.log(error)
        // Alert.alert('Sorry, something went wrong.', error.message);
        // throw handler(error);
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
        //  console.log(JSON.stringify(response),"access")
        return response;
    } catch (error) {
        // console.log(error)
        // Alert.alert('Sorry, something went wrong.', error.message);
        // throw handler(error);
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
        //  console.log(JSON.stringify(response),"access")
        return response;
    } catch (error) {
        console.log(error)
        // Alert.alert('Sorry, something went wrong.', error.message);
        // throw handler(error);
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
        //  console.log(JSON.stringify(response),"access")
        return response;
    } catch (error) {
        console.log(error)
        // Alert.alert('Sorry, something went wrong.', error.message);
        // throw handler(error);
    }
}


async function listRoomDetailsByRoomId(accessToken,roomId) {
    try {
        let url = `${API_URL}` + `${endpoints.fetchRoomsDetailsByRoomId}`;
        let response = await fetch(url.replace('#',roomId), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        //  console.log(JSON.stringify(response),"access")
        return response;
    } catch (error) {
        console.log(error)
        // Alert.alert('Sorry, something went wrong.', error.message);
        // throw handler(error);
    }
}

async function generatePaytmToken(accessToken1='', payload) {

    try {
        const accessToken = await deviceStorage.loadJWT();
        console.log("acc",accessToken)
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


async function initTenantRoomPayment(accessToken, payload) {

    try {

        let response = await fetch(`${API_URL}` + `${endpoints.initRoomPayment}`, {
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

async function  getRecentAllTenantsRoomOrderDetails (params, page) {

    try {
      console.log(page, "----page")
      setLoading(true);
      const res = await deviceStorage.loadJWT();
      await fetch(`${API_URL}` + `${endpoints.recentAllTenantsRoomOrderDetails}` + `?paymentStatus=` + `${params}` + `&page=` + `${page}` + `&size=` + `${5}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': res
        }
      }).then((response) => response.json())
        .then((json) => {
          console.log(page, "page")
          setPage(page + 1)
          console.log(page, "page")
          setLoading(false);
          setData([...data, ...json?.data])
        }).catch((error) => {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
      Alert.alert('Sorry, something went wrong.', e.message);
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
    getRecentAllTenantsRoomOrderDetails
}