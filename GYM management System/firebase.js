import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8Y5LP49xmPecM3iFgM9NK6kTK65DgJEc",
  authDomain: "gym-management-system-5ce66.firebaseapp.com",
  projectId: "gym-management-system-5ce66",
  storageBucket: "gym-management-system-5ce66.appspot.com",
  messagingSenderId: "957124828921",
  appId: "1:957124828921:web:5c357326ceaff5a2e24c28"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
