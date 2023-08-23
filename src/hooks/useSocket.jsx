import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ImageUrl } from '../api';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(ImageUrl, {
        
        
    });
    //   socketInstance.on
      socketInstance.connect();
    // socketInstance.on('connect', () => {
    //   console.log('Connected to Socket.IO server');
    // });

    // socketInstance.on('disconnect', () => {
    //   console.log('Disconnected from Socket.IO server');
    // });

    setSocket(socketInstance);

    return () => {
      // socketInstance.disconnect();
    };
  }, [ImageUrl]);

  return socket;
};

export default useSocket;
