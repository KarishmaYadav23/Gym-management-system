import { auth } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { signOut } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { saveLog } from "./logger.js";

window.logoutUser = async function () {
  await saveLog("Logout", "user", auth.currentUser.email);
  await signOut(auth);
  window.location.href = "login.html";
};

import { onAuthStateChanged } from
  
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});
