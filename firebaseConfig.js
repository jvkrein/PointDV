// firebaseConfig.js

import { initializeApp } from 'firebase/app';
// 1. Importar o 'getAuth' e as novas funções de persistência
import { 
  getAuth, 
  initializeAuth, 
  getReactNativePersistence 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// 2. Importar o AsyncStorage que acabamos de instalar
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// 3. O objeto de configuração (lendo do .env)
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 4. Inicializa o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// 5. CORREÇÃO DO ASYNCSTORAGE:
//    Isso "conecta" o Auth ao armazenamento nativo do celular
//    para que o login seja salvo.
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// 6. Exporta os serviços que vamos usar no resto do app
export const auth = getAuth(app); 
export const db = getFirestore(app); 

export default app;