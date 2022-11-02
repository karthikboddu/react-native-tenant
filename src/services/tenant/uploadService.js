import endpoints from "../../endpoints";
import deviceStorage from "../deviceStorage";

const API_URL = endpoints.apiUrl;




async function uploadTenantAsset (payload, tenantId, deliveryType) {
    try {
        console.log(payload, " --- ", tenantId)
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.uploadAsset}` + '?deliveryType=' + deliveryType;
        console.log(url," -- url --" , url.replace('#',tenantId))
        let response = await fetch(url.replace('#',tenantId), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'x-access-token': accessToken
            },
            body: payload
        });
        return response;
    } catch (e) {
        console.log(e,"Error")
        throw handler(e);
    }
}

async function uploadTenantProfileAsset (payload, deliveryType) {
    try {
        console.log(payload, " --- ", deliveryType)
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.uploadTenantProfileAsset}` + '?deliveryType=' + deliveryType;
        console.log(url," -- url --")
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'x-access-token': accessToken
            },
            body: payload
        });
        return response;
    } catch (e) {
        console.log(e,"Error")
        throw handler(e);
    }
}

async function getAssetUrl (tenantId, deliveryType) {
    try {
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.assetUrl}` + `?deliveryType=${deliveryType}`;
        let response = await fetch(url.replace('#',tenantId), {
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
    uploadTenantAsset,
    getAssetUrl,
    uploadTenantProfileAsset
};
