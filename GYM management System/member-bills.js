import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("billTable");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    // sirf logged-in member ke bills
    const q = query(
      collection(db, "bills"),
      where("memberId", "==", user.uid)
    );

    const snap = await getDocs(q);

    table.innerHTML = "";

    if (snap.empty) {
      table.innerHTML = `
        <tr>
          <td colspan="4" class="no-data">No Bills Found</td>
        </tr>`;
      return;
    }

    snap.forEach(doc => {
      const bill = doc.data();

      table.innerHTML += `
        <tr>
          <td>${bill.plan}</td>
          <td>₹${bill.amount}</td>
          <td>${bill.billDate}</td>
          <td class="status-paid">Paid</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error(error);
    table.innerHTML = `
      <tr>
        <td colspan="4" class="no-data">Error loading bills</td>
      </tr>`;
  }
});
