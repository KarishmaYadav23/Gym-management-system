import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tableBody = document.getElementById("membersTable");

const searchInput = document.getElementById("searchInput");



// LOAD ALL MEMBERS
async function loadMembers() {
  tableBody.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "members"));

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const id = docSnap.id;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.email}</td>
      <td>${data.mobile}</td>
      <td>${data.membership}</td>
      <td>${data.joiningDate}</td>
      <td>
        <button class="btn edit" onclick="editMember('${id}')">Edit</button>
        <button class="btn delete" onclick="deleteMember('${id}')">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// DELETE MEMBER
window.deleteMember = async function (id) {
  const confirmDelete = confirm("Are you sure you want to delete this member?");
  if (!confirmDelete) return;

  await deleteDoc(doc(db, "members", id));
  alert("Member deleted successfully");
await saveLog("Delete Member", "admin", auth.currentUser.email);

  loadMembers(); // refresh table
};

//EDIT MEMBER (UI placeholder – logic next step)

window.editMember = function (id) {
  localStorage.setItem("editMemberId", id);
  window.location.href = "edit-member.html";
};


// Initial load
loadMembers();
searchInput.addEventListener("keyup", function () {
  const searchValue = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll("#membersTable tr");

  rows.forEach(row => {
    const rowText = row.innerText.toLowerCase();
    row.style.display = rowText.includes(searchValue) ? "" : "none";
  });
});
