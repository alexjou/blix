
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDB84SfTG76vUxImNUh0OSCam7F6hlMgPw",
  authDomain: "blix-c47a3.firebaseapp.com",
  projectId: "blix-c47a3",
  storageBucket: "blix-c47a3.appspot.com",
  messagingSenderId: "419949980108",
  appId: "1:419949980108:web:03b1cf936a518d85e3d569"
};

export const firebase = initializeApp(firebaseConfig);

initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(firebase);

export const storage = getStorage();