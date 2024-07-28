import {auth, storage , db,onAuthStateChanged, 
    signOut, 
    getDoc,
    doc,} from "./utils/utils.js";

// console.log("auth==>", auth);
// console.log("stoarage==>", storage);
// console.log("db==>", db);

const logoutBtn = document.getElementById('logout_btn');
const loginLink = document.getElementById('login_link');
const userImg = document.getElementById('user_img');
const userName = document.getElementById('user_name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    loginLink.style.display = 'none';
    userImg.style.display = 'inline-block';
    getUserInfo(uid);
  } else {
    // User is signed out
    loginLink.style.display = 'inline-block';
    userImg.style.display = 'none';
    window.location.href = '/auth/login/index.html';
  }
});

logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Sign-out successful
    window.location.href = '/auth/login/index.html';
  }).catch((error) => {
    // An error happened
    alert("woao")
    console.error('Sign out error:', error);
  });
});

function getUserInfo(uid) {
  const userRef = doc(db, 'users', uid);
  getDoc(userRef)
    .then((doc) => {
      if (doc.exists()) {
        console.log('User ID:', doc.id);
        console.log('User Info:', doc.data());
        userImg.src = doc.data().img;  // Ensure this URL is correct
        userName.textContent = doc.data().firstName;  // Ensure this field exists
        email.textContent = doc.data().email;
        phone.textContent = doc.data().phone;
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.error('Error getting document:', error);
    });
}

const slideshow = document.getElementById('slideshow');
const images = [
    'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=400=750&w=1260',
    'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400=750&w=1260',
    'https://images.pexels.com/photos/2067436/pexels-photo-2067436.jpeg?auto=compress&cs=tinysrgb&w=400=750&w=1260',
    'https://images.pexels.com/photos/1639567/pexels-photo-1639567.jpeg?auto=compress&cs=tinysrgb&w=400=750&w=1260',
    'https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=400=750&w=1260'
];
let currentIndex = 0;

function changeBackgroundImage() {
    currentIndex = (currentIndex + 1) % images.length;
    slideshow.style.backgroundImage = `url('${images[currentIndex]}')`;
}

setInterval(changeBackgroundImage, 8000);

// Initialize the first image
changeBackgroundImage();


