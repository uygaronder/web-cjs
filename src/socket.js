import { io } from 'socket.io-client';

const chatSocketString = process.env.REACT_APP_API_URL + '/chat';

const chatSocket = io(chatSocketString);

export { chatSocket };