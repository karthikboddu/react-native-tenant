import endpoints from "../../endpoints";
import deviceStorage from "../deviceStorage";

const API_URL = endpoints.apiUrl;


async function saveOrderDetailsAndComplete (payload) {
    try {
        const accessToken = await deviceStorage.loadJWT();
        
        let response = await fetch(`${API_URL}` + `${endpoints.createOrderAndComplete}`, {
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

export {
    saveOrderDetailsAndComplete
};
