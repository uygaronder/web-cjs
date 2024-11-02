import { io } from 'socket.io-client';

const chatSocketString = process.env.REACT_APP_API_URL + '/chat';
const chatSocket = io(chatSocketString);

const notificationSocketString = process.env.REACT_APP_API_URL + '/notification';
const notificationSocket = io(notificationSocketString);

const user = JSON.parse(localStorage.getItem('user'));
notificationSocket.emit('initializeUser', user);

export { chatSocket, notificationSocket };