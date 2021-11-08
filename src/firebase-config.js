import * as firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserSessionPersistence } from '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDnrvqUr1qZEXxc725TkDytI37OQ2QPoOA",
    authDomain: "unid-16.firebaseapp.com",
    projectId: "unid-16",
    storageBucket: "unid-16.appspot.com",
    messagingSenderId: "383154209193",
    appId: "1:383154209193:web:ea55edb065506e498284b8",
    measurementId: "G-209Q63W6S8"
  };

const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);