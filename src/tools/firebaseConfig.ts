import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDA_76Bh5Um9xbMXIh6Gn1F0BLbfSYfsZI',
  authDomain: 'casino-6e127.firebaseapp.com',
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
