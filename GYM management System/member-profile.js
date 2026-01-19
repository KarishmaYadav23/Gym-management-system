import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    // member document same UID se linked hona chahiye
    const memberRef = doc(db, "members", user.uid);
    const memberSnap = await getDoc(memberRef);

    if (!memberSnap.exists()) {
      alert("Member profile not found");
      return;
    }

    const data = memberSnap.data();

    document.getElementById("profileName").innerText = data.name || "-";
    document.getElementById("profileEmail").innerText = data.email || user.email;
    document.getElementById("profileMobile").innerText = data.mobile || "-";
    document.getElementById("profilePlan").innerText = data.membership || "-";
    document.getElementById("profileJoin").innerText = data.joiningDate || "-";

  } catch (err) {
    console.error(err);
    alert("Failed to load profile");
  }
});
