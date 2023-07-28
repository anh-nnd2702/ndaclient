import { io } from 'socket.io-client';
let isConnected = false;
let companySocket = null;
let candidateSocket = null;
// Hàm tạo kết nối socket
export const createHrSocketConnection = (domain, companyId) => {
    if (isConnected) {
        console.log('Socket connection is already established.');
        return;
    };
    const socketId = `company${companyId}`;
    companySocket = io(domain, {
        query: { companyId },
        auth: { socketId },
    });

    companySocket.on('connect', () => {
        console.log('Connected to company namespace');
    });

    companySocket.on('disconnect', () => {
        console.log('Disconnected from company namespace');
        isConnected = false;
    });

    return companySocket;
};

export const createCandSocketConnection = (domain, candidateId) => {
    if (isConnected) {
        console.log('Socket connection is already established.');
        return;
    }
    const socketId = `candidate${candidateId}`;
    candidateSocket = io(domain, {
        query: { candidateId },
        auth: { socketId },
    });

    candidateSocket.on('connect', () => {
        console.log('Connected to candidate namespace');
    });

    candidateSocket.on('disconnect', () => {
        console.log('Disconnected from candidate namespace');
        isConnected = false;
    });

    return candidateSocket;
};

// Hàm ngắt kết nối socket
export const disconnectSocket = (socket) => {
    if (socket) {
        socket.disconnect();
        isConnected = false;
    }
};

export const checkConnectionStatus = () => {
    return isConnected;
};

export const updateConnectionStatus = (status) => {
    isConnected = status;
};

export const listenCompanyNotifications = (socket, onNotificationReceived) => {
    if (!socket) {
        return;
    }

    socket.on('companyNotification', (data) => {
        console.log('Received notification:', data);
        onNotificationReceived(data);
    });
};


export const listenApplyNotifications = (socket, onNotificationReceived) => {
    if (!socket) {
        return;
    }
    socket.on('applyNotification', (data) => {
        console.log('Received notification:', data);
        onNotificationReceived(data);
    });
};

