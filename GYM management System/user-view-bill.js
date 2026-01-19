import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const table = document.getElementById("billTable");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Please login again");
    window.location.href = "login.html";
    return;
  }

  //Fetch only logged-in user's bills
  const q = query(
    collection(db, "bills"),
    where("memberId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    table.innerHTML = `<tr><td colspan="3">No Bills Found</td></tr>`;
    return;
  }

  snapshot.forEach(doc => {
    const bill = doc.data();

    table.innerHTML += `
      <tr>
        <td>${bill.plan}</td>
        <td>₹ ${bill.amount}</td>
        <td>${bill.billDate}</td>
      </tr>
    `;
  });
});
