import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { saveLog } from "./logger.js";


window.loginUser = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      alert("User data not found in Firestore");
      return;
    }

    const role = userSnap.data().role;
    //logging code
    if (role === "admin") {
  await saveLog("Login", "admin", user.email);
  window.location.href = "admin.html";
}
else if (role === "user") {
  await saveLog("Login", "user", user.email);
  window.location.href = "user-dashboard.html";
}
else if (role === "member") {
  await saveLog("Login", "member", user.email);
  window.location.href = "member.html";
}
else {
      alert("Invalid role assigned");
    }

  } catch (error) {
    console.error(error);
    alert("Login failed: " + error.message);
  }
};
