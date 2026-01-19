import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function saveLog(action, role, email) {
  try {
    await addDoc(collection(db, "logs"), {
      action: action,
      role: role,
      email: email,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error("Log error:", err);
  }
}
