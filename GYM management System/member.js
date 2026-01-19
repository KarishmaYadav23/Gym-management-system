import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, collection, query, where, getDocs } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { saveLog } from "./logger.js";


// Check logged-in member
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists() || userSnap.data().role !== "member") {
    alert("Unauthorized access");
    window.location.href = "login.html";
    return;
  }
  //logout code
window.logout = async function () {
  await saveLog("Logout", "member", auth.currentUser.email);
  await signOut(auth);
  window.location.href = "login.html";
};


  loadProfile(user.uid);
  loadMembership(user.uid);
  loadBills(user.uid);
});

// My Profile
async function loadProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (snap.exists()) {
    document.getElementById("profileName").innerText = snap.data().name;
    document.getElementById("profileEmail").innerText = snap.data().email;
  }
}

// Membership
async function loadMembership(uid) {
  const snap = await getDoc(doc(db, "members", uid));
  if (snap.exists()) {
    document.getElementById("membershipPlan").innerText = snap.data().membership;
  }
}

// Bills
async function loadBills(uid) {
  const q = query(collection(db, "bills"), where("memberId", "==", uid));
  const querySnap = await getDocs(q);

  if (querySnap.empty) {
    document.getElementById("noBills").style.display = "block";
    return;
  }

  querySnap.forEach(doc => {
    console.log(doc.data());
  });
}

// Logout
window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};
