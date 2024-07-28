import {
    auth,
    signInWithEmailAndPassword, 
} from '../../utils/utils.js';

const loginForm = document.getElementById('login_form');

loginForm.addEventListener('submit', function (e){
    e.preventDefault();

    const email = e.target[0].value;
    console.log(email);
    const password = e.target[1].value;
    console.log(password);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential);
        window.location.href = '../index.html';
        }).catch((error) =>{
            console.log(error);
        });
});