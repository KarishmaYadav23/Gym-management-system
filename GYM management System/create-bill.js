import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const memberSelect = document.getElementById("member");
const planSelect = document.getElementById("plan");
const amountInput = document.getElementById("amount");

/*Load Members*/
async function loadMembers() {
  const snapshot = await getDocs(collection(db, "members"));
  snapshot.forEach(docSnap => {
    const option = document.createElement("option");
    option.value = docSnap.id;
    option.textContent = docSnap.data().name;
    memberSelect.appendChild(option);
  });
}
loadMembers();

/*Fetch amount from packages collection*/
planSelect.addEventListener("change", async () => {
  const selectedPlan = planSelect.value;
  if (!selectedPlan) {
    amountInput.value = "";
    return;
  }

  const packageRef = doc(db, "packages", selectedPlan);
  const packageSnap = await getDoc(packageRef);

  if (packageSnap.exists()) {
    amountInput.value = packageSnap.data().amount;
  } else {
    alert("Package not found. Please assign package first.");
    amountInput.value = "";
  }
});

/* Create Bill */
window.createBill = async function () {
  const memberId = memberSelect.value;
  const plan = planSelect.value;
  const amount = amountInput.value;
  const billDate = document.getElementById("billDate").value;

  if (!memberId || !plan || !amount || !billDate) {
    alert("All fields are required");
    return;
  }

  try {
    await addDoc(collection(db, "bills"), {
  userId: selectedUserId,   //IMPORTANT
  plan: plan,
  amount: amount,
  billDate: billDate,
  createdAt: new Date()
});
await saveLog("Create Bill", "admin", auth.currentUser.email);


    alert("Bill generated successfully");

    memberSelect.value = "";
    planSelect.value = "";
    amountInput.value = "";
    document.getElementById("billDate").value = "";

  } catch (error) {
    console.error(error);
    alert("Error creating bill");
  }
};
