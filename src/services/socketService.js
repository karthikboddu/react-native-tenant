import { io } from 'socket.io-client';
import endpoints from '../endpoints';

let socket;

export const initiateSocketConnection = (token) => {
    socket = io(endpoints.apiUrl, {
      auth: {
        token,
      },
    });
    console.log(`Connecting socket...`);
  };


export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
} 


export const subscribeToChat = (cb) => {
    console.log('socket...', cb);
	//socket.emit('my message', 'Hello there from React.');
}

export const subscribeToMessages = ({token},cb) => {
    console.log(token, "listening")
    if (!socket) return(true);
    socket.on(token, msg => {
      console.log('Room event received!',msg);
      return cb(null, msg);
    });
  }

export const sendMessage = ({message, roomName, stoken, to, parentId, image}, cb) => {
    if (socket) socket.emit('message', { message, roomName, stoken, to, parentId, image }, cb);
}

export const onTypingMessage = ({message, stoken, to, isTyping}, cb) => {
  if (socket) socket.emit('typing', { message, stoken, to, isTyping }, cb);
}
export const join = () => {
    socket.join('myRandomChatRoomId');
}


