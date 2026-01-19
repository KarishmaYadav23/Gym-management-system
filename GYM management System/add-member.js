import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Form submit
document.getElementById("addMemberForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const membership = document.getElementById("membership").value;
  const joiningDate = document.getElementById("joiningDate").value;

  if (!name || !email || !mobile || !membership || !joiningDate) {
    alert(" All fields are required");
    return;
  }

  try {
    await addDoc(collection(db, "members"), {
      name: name,
      email: email,
      mobile: mobile,
      membership: membership,
      joiningDate: joiningDate,
      createdAt: serverTimestamp()
    });

    alert("Member added successfully");

    
    await saveLog("Add Member", "admin", auth.currentUser.email);


    document.getElementById("addMemberForm").reset();

  } catch (error) {
    console.error("Error adding member: ", error);
    alert(" Error adding member");
  }
});
