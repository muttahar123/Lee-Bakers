import {
    auth,
    createUserWithEmailAndPassword,
    doc,
    db,
    storage,
    setDoc,
    ref,
    uploadBytes,
    getDownloadURL,
} from '../utils/utils.js'

// 1. Create Account // createUserWithEmailAndPassword
// 2. Upload Image //  ref, uploadBytes, getDownloadURL
// 3. Create User Document // doc, setDoc
// 4. Create User Collection // ref
// 5. Create User Profile // doc, setDoc
// 6. Create User Post // doc, setDoc
// 7. Create User Post Image // ref, uploadBytes, getDownloadURL
// 8. Create User Post Comment // doc, setDoc
// 9. Create User Post Like // doc, setDoc
// 10. Create User Post Share // doc, setDoc
// 11. Create User Post Report // doc, setDoc
// 12. Create User Post Delete // doc, setDoc
// 13. Create User Post Edit // doc, setDoc
// 14. Create User Post Comment Delete // doc, setDoc
// 15. Create User Post Comment Edit // doc, setDoc
// 16. Create User Post Like Delete // doc, setDoc
// 17. Create User Post Share Delete // doc, setDoc
// 18. Create User Post Report Delete // doc, setDoc
// 19. Create User Post Comment Like // doc, setDoc
// 20. Create User Post Comment Share // doc, setDoc
// 21. Create User Post Comment Report // doc, setDoc
// 22. Set Complete Data into FireStore // doc, setDoc

const signUpBtn = document.getElementById('signup_form');
const submitBtn = document.getElementById('submit_btn');

signUpBtn.addEventListener('submit', (e) =>{
    console.log(e);
    e.preventDefault();


    const img = e.target[0].files[0];
    console.log('img', img);
    const email = e.target[1].value;
    const password = e.target[2].value;
    const firstName = e.target[4].value;
    const lastName = e.target[5].value;
    const phone = e.target[6].value;
    const company = e.target[7].value;

    const userInfo = {
        img,
        email,
        password,
        firstName,
        lastName,
        phone,
        company,
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Loading...';
    createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
        console.log('user',user.user.uid);

        // upload image
        const userRef = ref(storage, `user/${user.user.uis}`);
        // const uploadTask = uploadBytes(storageRef, img);
        uploadBytes(userRef, img)
        .then(() =>{
            console.log('User image uploaded');
            // getting Url of the image we just uploaded
            getDownloadURL(userRef)
            .then((url) => {
                console.log('url Aa gaya', url);
                userInfo.img = url;
                // created user document ref
                const userDbRef = doc(db, 'users', user.user.uid);
                // set user data into db
                setDoc(userDbRef, userInfo).then(() =>{
                    console.log('User data set into db');
                    window.location.href = '/auth/index.html';
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Submit';
                })

            })
            .catch((err) =>{
                console.log('url issue', err);
                submitBtn.disabled = false;
                    submitBtn.innerText = 'Submit';
            })
        }).catch(() =>{
            console.log('image not uploaded');
            submitBtn.disabled = false;
                    submitBtn.innerText = 'Submit';
        })

    })
    .catch((err) => {
        alert(err), (submitBtn.disabled = false);
        submitBtn.innerText = 'Submit';
    });
    console.log(userInfo);
});

// import {
//     auth,
//     createUserWithEmailAndPassword,
//     doc,
//     storage,
//     setDoc,
//     ref,
//     uploadBytes,
//     getDownloadURL,
// } from '../utils/utils.js';

// const signUpBtn = document.getElementById('signup_form');

// signUpBtn.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const img = e.target[0].files[0];
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const firstName = e.target[4].value;
//     const lastName = e.target[5].value;
//     const phone = e.target[6].value;
//     const company = e.target[7].value;

//     const userInfo = {
//         img,
//         email,
//         password,
//         firstName,
//         lastName,
//         phone,
//         company,
//     };

//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
//         console.log('user', user.uid);

//         // Upload image to Firebase Storage
//         const storageRef = ref(storage, `user/${user.uid}/${img.name}`);
//         await uploadBytes(storageRef, img);
//         console.log('image uploaded');

//         // Getting URL of the uploaded image
//         const imgURL = await getDownloadURL(storageRef);
//         console.log('url', imgURL);

//         // Create user document in Firestore
//         await setDoc(doc(db, 'users', user.uid), {
//             email,
//             firstName,
//             lastName,
//             phone,
//             company,
//             imgURL,
//         });

//         console.log('User document created successfully');
//     } catch (err) {
//         console.error('Error creating user:', err);
//         alert(err.message);
//     }

//     console.log(userInfo);
// });



