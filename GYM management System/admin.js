import { auth } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});



import { saveLog } from "./logger.js";

window.logout = async function () {
  await saveLog("Logout", "admin", auth.currentUser.email);
  await signOut(auth);
  window.location.href = "login.html";
};


function showFutureModal() {
  document.getElementById("futureModal").style.display = "block";
}

function closeFutureModal() {
  document.getElementById("futureModal").style.display = "none";
}
