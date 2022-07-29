import endpoints from "../endpoints";
import deviceStorage from "./deviceStorage";
const API_URL = endpoints.apiUrl;


async function saveTenantConversations(payload) {
    try {
        console.log(payload,"payload1")
        const accessToken = await deviceStorage.loadJWT();
        
        let response = await fetch(`${API_URL}` + `${endpoints.saveConversations}`, {
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


async function listTenantConversations(toTenantId) {
    try {
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.listConversationsByTenantId}`;
        console.log(url,"url",toTenantId)
        let response = await fetch(url.replace('#',toTenantId), {
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

async function listAllTenantLastConversations() {
    try {
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.listAllLastConversationsByTenantId}`;
        let response = await fetch(url, {
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
    saveTenantConversations,
    listTenantConversations,
    listAllTenantLastConversations
};
