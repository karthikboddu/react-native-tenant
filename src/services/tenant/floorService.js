import endpoints from "../../endpoints";
import deviceStorage from "../deviceStorage";

const API_URL = endpoints.apiUrl;

async function createNewBuildingFloorData (payload, buildingId) {
    try {
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.createBuildingFLoor}`;
        let response = await fetch(url.replace('#',buildingId), {
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
    createNewBuildingFloorData
};
