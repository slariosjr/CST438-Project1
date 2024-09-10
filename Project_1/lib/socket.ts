import UdpSocket from 'react-native-udp';
import { NetworkInfo } from 'react-native-network-info';

// I Swear to god if something uses that port.. 
export const UDP_PORT = 7676;
export let isServer: boolean = false;

// This is to easily Identify message types:
const PROTOCALLS = {
    SEARCHING: 76, 
    LISTENING: 77,
    DATATRANSFER: 78, 
    COMPARE: 79, 
    DISCONNECT: 80,
    ERROR: 81,
};

// -Idea:
// 'Message' : Listens and calls functions on messages to that port
// isListening Variable : to find out when we are listening, 
// NearbyPorts : to list all the ports that are listening
// currentState : To store the state of the server based on the protocalls. 


// Searching -> Listening -> Data transfer 
//  ^                      -> Compare
//  |                     -> Disconnect
//  ^-                        <-

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