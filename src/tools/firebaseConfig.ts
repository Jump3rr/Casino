import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDA_76Bh5Um9xbMXIh6Gn1F0BLbfSYfsZI',
  authDomain: 'casino-6e127.firebaseapp.com',
  databaseURL:
    'https://casino-6e127-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'casino-6e127',
  storageBucket: 'casino-6e127.appspot.com',
  messagingSenderId: '911263058038',
  appId: '1:911263058038:web:e94d6c41c3c3a14f1b7757',
  measurementId: 'G-LGFTVFJFHZ',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
//export const db = getDatabase(app);
export const db = getFirestore(app);
