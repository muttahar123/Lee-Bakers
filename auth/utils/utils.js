
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
   } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import { 
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    deleteDoc,
   } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  import { 
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
   } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

   const firebaseConfig = {
    apiKey: "AIzaSyDFF9ITukAuH0oNf1auLSSwyMP0H-_29xw",
    authDomain: "e-commerce-project-915bd.firebaseapp.com",
    projectId: "e-commerce-project-915bd",
    storageBucket: "e-commerce-project-915bd.appspot.com",
    messagingSenderId: "587438217502",
    appId: "1:587438217502:web:367a89c4760967c04dd10f"
    // measurementId: "G-YPVC31PP0Q"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {
    auth,
    db,
    storage, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    doc,
    setDoc,
    ref,
    uploadBytes,
    getDownloadURL,
    signOut,
    getDoc,
    getDocs,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    deleteDoc,
  };

