import { db } from "./firebase.js";
import { doc, getDoc, updateDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const memberId = localStorage.getItem("editMemberId");

const name = document.getElementById("name");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const membership = document.getElementById("membership");
const joiningDate = document.getElementById("joiningDate");

// Load existing data
async function loadMember() {
  const docRef = doc(db, "members", memberId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    name.value = data.name;
    email.value = data.email;
    mobile.value = data.mobile;
    membership.value = data.membership;
    joiningDate.value = data.joiningDate;
  }
}

loadMember();

// Update data
window.updateMember = async function () {
  try {
    await updateDoc(doc(db, "members", memberId), {
      name: name.value,
      email: email.value,
      mobile: mobile.value,
      membership: membership.value,
      joiningDate: joiningDate.value
    });
await saveLog("Update Member", "admin", auth.currentUser.email);

    alert("Member updated successfully");
    localStorage.removeItem("editMemberId");
    window.location.href = "view-members.html";

  } catch (error) {
    console.error(error);
    alert("Error updating member");
  }
};
