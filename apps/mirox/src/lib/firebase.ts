import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX6RCjCjd0vrSMSe7DyPqCq-e6Na1lg3M",
  authDomain: "miroxforest-7c481.firebaseapp.com",
  projectId: "miroxforest-7c481",
  storageBucket: "miroxforest-7c481.appspot.com",
  messagingSenderId: "1051912075692",
  appId: "1:1051912075692:web:ec5b85682aec9985276209",
  measurementId: "G-8ZC2P0VKSJ"
};
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
}
else {
  app = getApp();
}

export { app };
export const auth = getAuth(app);
auth.useDeviceLanguage()
auth.settings.appVerificationDisabledForTesting = false;
export const firedb = getFirestore(app);