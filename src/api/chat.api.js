// imports
const API_URL = process.env.REACT_APP_API_URL;
const CHAT_API_URL = `${API_URL}/chat`;


// functions
export async function sendMessage(message, chatroomID) {
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

export async function createChatroom(chatroomInfo, creator, invitedUsers) {
    const response = await fetch(`${CHAT_API_URL}/createchatroom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chatroomInfo,
            creator,
            invitedUsers,
        }),
    });
    
    return response.json();
}

export async function getChatrooms(userID) {
    console.log('userID:', userID);
    const response = await fetch(`${CHAT_API_URL}/getChats?userID=${userID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}