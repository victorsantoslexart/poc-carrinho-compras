import { initializeApp } from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyBTZ-woRwEfL1cjAAh7kr42Gc2xY4eKU4E',
  authDomain: 'poc-carrinho-compras.firebaseapp.com',
  databaseURL: 'https://poc-carrinho-compras-default-rtdb.firebaseio.com',
  projectId: 'poc-carrinho-compras',
  storageBucket: 'poc-carrinho-compras.appspot.com',
  messagingSenderId: '651577364051',
  appId: '1:651577364051:web:501a6806b61bc9ff5180a6',
  measurementId: 'G-7C6HDK8JYK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export default database;
