import {
  FB_API_KEY,
  FB_APP_ID,
  FB_AUTH_DOMAIN,
  FB_DATABASE_URL,
  FB_MESSAGING_SENDER_ID,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
} from '@env';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  databaseURL: FB_DATABASE_URL,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
  appId: FB_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerRequest = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
