import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Service } from 'react-native-ble-plx';
import BLEPeripheral from '@/lib/react-native-ble-peripheral'

import * as Device from 'expo-device';

// Documentation: 
// https://expo.dev/blog/how-to-build-a-bluetooth-low-energy-powered-expo-app


//lets assure nothing uses this
const SERVICE_ID = '70fb393f-454b-41db-ba30-0849dbcefa36'
const CHARACTERISTIC_UUID = '0ec14651-579f-45f5-a513-8d6ff3172991'


//Stub!
export type connection = {
  deviceName: string,
  HID: string,
  address: string,
}

const bleManager = new BleManager();

// This for making sure we know what are we connecting too. 
// Stil a stub.
export const connectAlert = (deviceName: string) => {
  Alert.alert(`Connect to ${deviceName}?`, `Do you want to compare games with ${deviceName}?`, [
    {
      text: 'No',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: () => console.log('Yes Pressed')
    },
  ]);
}

export const requestPermBlue = async () => {
  const apiLevel = Device.platformApiLevel ?? -1;
  try {
    if (apiLevel < 31) {
      // No reason to lock type since type way too long
      // See C++ uses for auto
      const isPermissionGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return isPermissionGranted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // No reason to lock type since type way too long
      // See C++ uses for auto
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN,
      ]);
      // Funny thing about these permissions, only Development builds can access bluetooth.. 
      const isPermissionGranted = Object.values(granted).every(
        (val) => val === PermissionsAndroid.RESULTS.GRANTED,
      );
      return isPermissionGranted;
    }
  } catch (err) {
    // Sanity check so the shotgun pointed to the roof my mouth goes off. 
    console.warn(err);
    return false;
  }
};

// O(1) Hashing
const devices = new Map();

export const scanNearby = async () => {
  // bleManager.descriptorsForDevice
  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.log("Error: line 70 Bluetooth.ts: ", error);
    }
    if (device?.localName == null) return;
    // Okay lets insert it in the hash.. 
    // if (devices.has(device.localName)) return;
    // else devices.set(device.localName, device);
    console.log(device.localName);
    console.log(device.name);
    console.log(device.serviceUUIDs);
    // console.log(device);
    // try {
    //   bleManager.connectToDevice(device.id).then(device => {
    //     console.log(device.discoverAllServicesAndCharacteristics());
    //     return device.discoverAllServicesAndCharacteristics();
    //   })
    // } catch (error) {
    //   console.error('Error connecting to device', error);
    // }
    // console.log(device.serviceData);

    // device.readCharacteristicForService(SERVICE_ID, CHARACTERISTIC_UUID)
    //   .then(characteristic => {
    //     console.log('Read characteristic value:', characteristic.value)
    //   })
    //   .catch(error => {
    //     console.error('Read characteristic error:', error)
    //   })
  })

  return [];
}