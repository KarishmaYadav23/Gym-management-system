import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tableBody = document.getElementById("notificationTable");

//Generate Notifications
window.generateNotifications = async function () {
  const membersSnapshot = await getDocs(collection(db, "members"));

  for (const docSnap of membersSnapshot.docs) {
    const m = docSnap.data();

    if (m.membership === "Monthly") {
      const message = `Membership expiring for ${m.name}. Please renew.`;

      await addDoc(collection(db, "notifications"), {
        memberName: m.name,
        message: message,
        date: new Date().toLocaleDateString(),
        status: "Pending"
      });
    }
  }

  alert("Monthly notifications generated");
  loadNotifications();
};

// Load Notifications
async function loadNotifications() {
  tableBody.innerHTML = "";
  const snapshot = await getDocs(collection(db, "notifications"));

  snapshot.forEach(docSnap => {
    const n = docSnap.data();
    tableBody.innerHTML += `
      <tr>
        <td>${n.memberName}</td>
        <td>${n.message}</td>
        <td>${n.date}</td>
        <td>${n.status}</td>
      </tr>
    `;
  });
}

loadNotifications();
