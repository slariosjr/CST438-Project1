import UdpSocket from 'react-native-udp';
import { NetworkInfo } from 'react-native-network-info';

// I Swear to god if something uses that port.. 
export const UDP_PORT = 7676;
export let isServer: boolean = false;

export const PROTOCALLS = {
    76: "SEARCHING",
    77: "DATA-TRANSFER",
    78: "ACCOUNT-TRANSFER",
};

export const startServer = () :UdpSocket => {
    let socket = UdpSocket.createSocket({ type: 'udp4' });
    socket.bind(UDP_PORT);
    return socket;
}

export const getIPAddress = async () :Promise<string> => {
    try {
        const IP = await NetworkInfo.getIPV4Address();
        if (IP == null) throw new Error("Didn't get the IP");
        return IP;
    } catch (error) {
        console.error("Error: ")
        return '';
    }
}