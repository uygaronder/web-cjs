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
            userID: messageInfo.userID,
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

export async function getChatroom(chatroomID, userID) {
    const response = await fetch(`${CHAT_API_URL}/getChatroom?chatroomID=${chatroomID}&userID=${userID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export async function getMessages(chatroomID) {
    const response = await fetch(`${CHAT_API_URL}/getMessages?chatroomID=${chatroomID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}