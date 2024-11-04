import { io } from 'socket.io-client';

const user = JSON.parse(localStorage.getItem('user'));
const userId = user ? user._id : null;

//io(process.env.REACT_APP_API_URL, { query: { userId } });

const chatSocketString = process.env.REACT_APP_API_URL + '/chat';
const chatSocket = io(chatSocketString, {
    query: { userId },
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
});

const notificationSocketString = process.env.REACT_APP_API_URL + '/notification';
const notificationSocket = io(notificationSocketString, { query: { userId } });

notificationSocket.emit('initializeUser', user);

const userSocketString = process.env.REACT_APP_API_URL + '/user';
const userSocket = io(userSocketString, { query: { userId } });

export { chatSocket, notificationSocket, userSocket };