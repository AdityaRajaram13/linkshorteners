import { initializeApp} from 'firebase/app';
import {  getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHdSTjRZ_hPl8u8-fuhRzt4H6o7r39iZk",
  authDomain: "linkshortener-cb5f4.firebaseapp.com",
  projectId: "linkshortener-cb5f4",
  storageBucket: "linkshortener-cb5f4.appspot.com",
  messagingSenderId: "520866252026",
  appId: "1:520866252026:web:7a24bfb4d28c9569c5b543",
  measurementId: "G-PTSY1X62LV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
