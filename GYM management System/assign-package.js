import { db } from "./firebase.js";
import { doc, setDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.savePackage = async function () {
  const type = document.getElementById("packageType").value;
  const duration = document.getElementById("duration").value;
  const amount = document.getElementById("amount").value;

  if (!type || !duration || !amount) {
    alert("All fields are required");
    return;
  }

  try {
    await setDoc(doc(db, "packages", type), {
      duration,
      amount
    });

    alert("Package saved successfully");
    document.getElementById("packageType").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("amount").value = "";

  } catch (error) {
    console.error(error);
    alert("Error saving package");
  }
};
