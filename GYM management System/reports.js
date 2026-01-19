import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const membersRef = collection(db, "members");
const billsRef = collection(db, "bills");

const totalMembersEl = document.getElementById("totalMembers");
const totalBillsEl = document.getElementById("totalBills");
const totalRevenueEl = document.getElementById("totalRevenue");

const memberTable = document.getElementById("memberReportBody");
const billTable = document.getElementById("billReportBody");

let membersMap = {}; 

/* MEMBERS */
async function loadMembers() {
  const snapshot = await getDocs(membersRef);
  totalMembersEl.innerText = snapshot.size;

  memberTable.innerHTML = "";

  snapshot.forEach(doc => {
    const m = doc.data();
    membersMap[doc.id] = m;

    memberTable.innerHTML += `
      <tr>
        <td>${m.name}</td>
        <td>${m.email}</td>
        <td>${m.mobile}</td>
        <td>${m.membership}</td>
        <td>${m.joiningDate}</td>
      </tr>
    `;
  });
}

/* BILLS */
async function loadBills() {
  const snapshot = await getDocs(billsRef);

  let totalRevenue = 0;
  billTable.innerHTML = "";

  snapshot.forEach(doc => {
    const b = doc.data();
    totalRevenue += Number(b.amount);

    const member = membersMap[b.memberId];

    billTable.innerHTML += `
      <tr>
        <td>${member ? member.name : "Unknown"}</td>
        <td>${b.plan}</td>
        <td>₹${b.amount}</td>
        <td>${b.billDate}</td>
      </tr>
    `;
  });

  totalBillsEl.innerText = snapshot.size;
  totalRevenueEl.innerText = "₹" + totalRevenue;
}

/* LOAD ALL */
async function loadReports() {
  await loadMembers();
  await loadBills();
}

loadReports();
