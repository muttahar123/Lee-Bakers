// import {
//   auth,
//   storage,
//   db,
//   signOut,
//   getDoc,
//   doc,
//   onAuthStateChanged,
// } from "./utils/utils.js";

// const logoutBtn = document.getElementById('logout_btn');
// const loginLink = document.getElementById('login_link');
// const userImg = document.getElementById('user_img');

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/auth.user
//       const uid = user.uid;
//       loginLink.style.display = 'none';
//       userImg.style.display = 'inline-block';
//       getUserInfo(uid);
//       // ...
//     } else {
//       window.location.href = '/auth/login/index.html'
//       loginLink.style.display = 'inline-block';
//       userImg.style.display = 'none';
//     }
//   });

//   logoutBtn.addEventListener('click', ()=>{
//     signOut(auth)
//     // .then(() => {
//     //   // Sign-out successful.
//     //   window.location.href = '/auth/login/index.html'
//     //   }).catch((error) => {
//     //     // An error happened.
//     //     });
//   });

//   function getUserInfo(uid){
//     const userRef = doc(db, 'user', uid);
//     getDoc(userRef)
//     .then((data) => {
//       console.log('userId',data.id);
//       console.log('userInfo',data.data());
//     });
//   }

import {
  auth,
  db,
  signOut,
  getDoc,
  doc,
  onAuthStateChanged,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from "../utils/utils.js";

const logoutBtn = document.getElementById("logout_btn");
const loginLink = document.getElementById("login_link");
const userImg = document.getElementById("user_img");
const userName = document.getElementById("user_name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const eventsCardsContainer = document.getElementById("events_cards_container");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    loginLink.style.display = "none";
    userImg.style.display = "inline-block";
    getUserInfo(uid);
    getMyEvents(user.uid);
  } else {
    // User is signed out
    loginLink.style.display = "inline-block";
    userImg.style.display = "none";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful
      window.location.href = "/auth/login/index.html";
    })
    .catch((error) => {
      // An error happened
      console.error("Sign out error:", error);
    });
});

function getUserInfo(uid) {
  const userRef = doc(db, "users", uid);
  getDoc(userRef)
    .then((doc) => {
      if (doc.exists()) {
        console.log("User ID:", doc.id);
        console.log("User Info:", doc.data());
        userImg.src = doc.data().img; // Ensure this URL is correct
        userName.textContent = doc.data().firstName; // Ensure this field exists
        email.textContent = doc.data().email;
        phone.textContent = doc.data().phone;
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
}

async function getMyEvents(uid) {
  try {
    const q = query(collection(db, 'events'),('createdBy', '==', uid));
    const querySnapshot = await getDocs(q);
    eventsCardsContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      const event = doc.data();

      console.log("event", event);
      const {
        banner,
        title,
        description,
        date,
        time,
        location,
        createByEmail,
      } = event;

      const card = `
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
              <a href="#">
                  <img class="rounded-t-lg card-image" src="${banner}" alt="product image" />
              </a>
              <div class="p-5">
                  <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${title}</h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700">${description}</p>
                  <p class="mb-3 font-normal text-gray-700">${date}</p>
                  <p class="mb-3 font-normal text-gray-700">${time}</p>
                  <h6 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${location}</h6>
                  <p class="mb-3 font-normal text-gray-700">${createByEmail}</p>
                  <button
                   type="button" class="text-white bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center">
                  ${
                    auth?.currentUser &&
                    event?.likes?.includes(auth?.currentUser.uid)
                      ? "Liked"
                      : "Like"
                  }
                  ${event?.likes?.length ? event?.likes?.length : ""}
                </button>
                  <button id = ${doc.id} onclick = 'deleteEvent(this)'
                    type="button" class="text-white bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-400 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center justify-center">
                 Delete
                </button>
              </div>
          </div>
        `;
        window.deleteEvent = deleteEvent;
      eventsCardsContainer.innerHTML += card;

      console.log(event);
    });
  } catch (err) {
    alert(err);
  }
}

async function deleteEvent(e){
  const docRef = doc(db, 'events', e.id)
  await deleteDoc(docRef);
  getMyEvents(auth.currentUser.uid);
}

// Assuming you call getAllEvents somewhere in your code to load the events
// getAllEvents();
