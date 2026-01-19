import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tableBody = document.getElementById("membersTable");
const searchInput = document.getElementById("searchInput");

// Load members
async function loadMembers() {
  tableBody.innerHTML = "";

  const snapshot = await getDocs(collection(db, "members"));

  snapshot.forEach(docSnap => {
    const m = docSnap.data();

    tableBody.innerHTML += `
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

loadMembers();

// Search (client-side)
searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("#membersTable tr");

  rows.forEach(row => {
    row.style.display =
      row.innerText.toLowerCase().includes(value) ? "" : "none";
  });
});
