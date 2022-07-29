import endpoints from "../../endpoints";

const API_URL = endpoints.apiUrl;


async function unlinkTenantRoomContract(accessToken, payload) {
    console.log(payload,"payload")
    try {

        let response = await fetch(`${API_URL}` + `${endpoints.updateTenantRoomContract}`, {
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

export {
    unlinkTenantRoomContract
};
