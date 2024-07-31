// imports
const API_URL = process.env.REACT_APP_API_URL;
const CHAT_API_URL = `${API_URL}/chat`;


// functions
async function sendMessage(message, chatroomID) {
    const response = await fetch(`${CHAT_API_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            chatroomID,
        }),
    });

    return response.json();
}

async function createChatroom(chatroomInfo, userIDs) {
    const response = await fetch(`${CHAT_API_URL}/createchatroom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chatroomInfo,
            userIDs,
        }),
    });

    return response.json();
}

async function getChatrooms(userID) {
    const response = await fetch(`${CHAT_API_URL}/chatrooms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userID,
        }),
    });

    return response.json();
}

export default {
    sendMessage,
    createChatroom,
    getChatrooms,
};