import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyC4Q_oGd-Gp60q3uV1PejUOzyq3F6WNyd8',
  authDomain: 'bookexchage-d8853.firebaseapp.com',
  projectId: 'bookexchage-d8853',
  storageBucket: 'bookexchage-d8853.appspot.com',
  messagingSenderId: '119191781686',
  appId: '1:119191781686:web:79b64977cfc4870ef27397',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
