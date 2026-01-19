import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const box = document.getElementById("notificationBox");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    const q = query(
      collection(db, "notifications"),
      where("role", "==", "member"),
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);
    box.innerHTML = "";

    if (snap.empty) {
      box.innerHTML = `<p class="no-data">No notifications available</p>`;
      return;
    }

    snap.forEach(doc => {
      const n = doc.data();

      box.innerHTML += `
        <div class="notification-card">
          <h3>${n.title}</h3>
          <p>${n.message}</p>
          <div class="notification-date">${n.createdAt}</div>
        </div>
      `;
    });

  } catch (error) {
    console.error(error);
    box.innerHTML = `<p class="no-data">Error loading notifications</p>`;
  }
});
