// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const apiUrl = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiUrl,
  authDomain: 'train-a4088.firebaseapp.com',
  projectId: 'train-a4088',
  storageBucket: 'train-a4088.appspot.com',
  messagingSenderId: '160421425174',
  appId: '1:160421425174:web:5b6ade565a1f6084304537',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
