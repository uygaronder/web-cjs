// imports
const API_URL = process.env.REACT_APP_API_URL;
const CHAT_API_URL = `${API_URL}/chat`;

// functions
export async function sendMessage(messageInfo) {
    const response = await fetch(`${CHAT_API_URL}/newMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: messageInfo.message,
            chatroomID: messageInfo.chatroomID,
            reply: messageInfo.reply,
            image: messageInfo.image,
            user: messageInfo.user,
        }),
    });

    return response.json();
}

export async function createChatroom(chatroomInfo, creator) {
    const response = await fetch(`${CHAT_API_URL}/createchatroom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chatroomInfo,
            creator,
        }),
    });
    
    return response.json();
}

export async function getChatrooms(userID) {
    const response = await fetch(`${CHAT_API_URL}/getChats?userID=${userID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export async function getPublicChatrooms(query) {
    const response = await fetch(`${CHAT_API_URL}/getPublicChatrooms?query=${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export async function getChatroom(chatroomID, userID) {
    const response = await fetch(`${CHAT_API_URL}/getChatroom?chatroomID=${chatroomID}&userID=${userID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(error => {
        console.error("error: ", error);
        return error;
    });
    return response.json();
}

export async function getMessages(chatroomID, { skip = 0 , limit = 5 } = {}) {
    console.log("Fetching messages for chatroom: ", chatroomID, " with skip: ", skip, " and limit: ", limit);
    const response = await fetch(`${CHAT_API_URL}/getMessages?chatroomID=${chatroomID}&skip=${skip}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export async function deleteChatroom(chatroomID) {
    const response = await fetch(`${CHAT_API_URL}/deleteChatroom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatroomID }),
    });
    return response.json();
}

export async function joinPublicChatroom(chatroomID, userID, username) {
    const response = await fetch(`${CHAT_API_URL}/joinPublicChatroom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatroomID, userID, username }),
    });
    return response.json();
}

export async function leaveChatroom(chatroomID, userID, username) {
    const response = await fetch(`${CHAT_API_URL}/leaveChatroom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatroomID, userID, username }),
    });
    return response.json();
}