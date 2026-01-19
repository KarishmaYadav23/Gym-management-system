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
    // membership info members collection me hi hai
    const memberRef = doc(db, "members", user.uid);
    const snap = await getDoc(memberRef);

    if (!snap.exists()) {
      alert("Membership data not found");
      return;
    }

    const data = snap.data();

    document.getElementById("mPlan").innerText = data.membership || "-";
    document.getElementById("mAmount").innerText = data.amount || "0";
    document.getElementById("mStart").innerText = data.startDate || "-";
    document.getElementById("mEnd").innerText = data.endDate || "-";

    // status logic
    const statusEl = document.getElementById("mStatus");
    const today = new Date();
    const endDate = new Date(data.endDate);

    if (endDate >= today) {
      statusEl.innerText = "Active";
      statusEl.classList.add("active");
    } else {
      statusEl.innerText = "Expired";
      statusEl.classList.add("expired");
    }

  } catch (err) {
    console.error(err);
    alert("Error loading membership");
  }
});
