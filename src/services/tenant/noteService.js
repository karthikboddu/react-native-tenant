import endpoints from "../../endpoints";
import deviceStorage from "../deviceStorage";

const API_URL = endpoints.apiUrl;


async function saveNotes(payload) {
    try {
        const accessToken = await deviceStorage.loadJWT();
        
        let response = await fetch(`${API_URL}` + `${endpoints.createNotes}`, {
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


async function findAllNotes( query) {
    try {
        
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.findAllNotes}` + query;
       
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        });
        console.log("ad",url)
        return response;
    } catch (e) {
        Alert.alert('Sorry, something went wrong.', e.message);
        throw handler(e);
    }
}

async function updateNotesById(noteId , payload) {
    try {
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.updateNotes}`;

        let response = await fetch(url.replace('#',noteId), {
            method: 'PUT',
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

async function deleteNotesById(noteId) {
    try {
        const accessToken = await deviceStorage.loadJWT();
        let url = `${API_URL}` + `${endpoints.deleteNotes}`;

        let response = await fetch(url.replace('#',noteId), {
            method: 'DELETE',
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
    saveNotes,
    findAllNotes,
    updateNotesById,
    deleteNotesById
};
