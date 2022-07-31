import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAmZJXY1QFfPeRqjf-n0ZZXbnjY6VCJdYs',
  authDomain: 'ooopenchat.firebaseapp.com',
  projectId: 'ooopenchat',
  storageBucket: 'ooopenchat.appspot.com',
  messagingSenderId: '495145861093',
  appId: '1:495145861093:web:710b2472b1dee706ee790c',
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
