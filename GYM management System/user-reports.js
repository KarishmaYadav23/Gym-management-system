import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const billTable = document.getElementById("billTable");
const noBills = document.getElementById("noBills");
const totalBills = document.getElementById("totalBills");
const totalAmount = document.getElementById("totalAmount");

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const q = query(
    collection(db, "bills"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    noBills.style.display = "block";
    return;
  }

  let billCount = 0;
  let amountSum = 0;

  snapshot.forEach(doc => {
    const bill = doc.data();
    billCount++;
    amountSum += Number(bill.amount);

    billTable.innerHTML += `
      <tr>
        <td>${bill.plan}</td>
        <td>₹${bill.amount}</td>
        <td>${bill.billDate}</td>
      </tr>
    `;
  });

  totalBills.innerText = billCount;
  totalAmount.innerText = "₹" + amountSum;
});
