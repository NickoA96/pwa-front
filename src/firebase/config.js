// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage,uploadBytes,ref, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';

const firebaseConfig = {
    apiKey: "AIzaSyDCV2Q9AiYSP0tUlpvxm4EJ51PvIV2PSl4",
    authDomain: "pwa-imagenes.firebaseapp.com",
    projectId: "pwa-imagenes",
    storageBucket: "pwa-imagenes.appspot.com",
    messagingSenderId: "219755950582",
    appId: "1:219755950582:web:20e839352041afabf897d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async  function uploadFile(file) {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef);
    return url;
}




