 import { 
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    db,
    collection,
    addDoc,
    doc,
    auth,
} from "../utils/utils.js";

console.log(auth);

const eventForm = document.getElementById('event_form');

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted', e);

    const eventInfo = {
        banner: e.target[0].files[0],
        title: e.target[1].value,
        location: e.target[2].value,
        date: e.target[3].value,
        time: e.target[4].value,
        description: e.target[5].value,
        createBy: auth.currentUser.uid,
        createByEmail: auth.currentUser.email,
        likes: [],
    };

    console.log('eventInfo',eventInfo);
    const imgRef = ref(storage, eventInfo.banner.name);
    uploadBytes(imgRef, eventInfo.banner).then(() => {
        console.log('file upload done');
        getDownloadURL(imgRef).then((url) => {
            console.log('file url', url);
            eventInfo.banner = url;

            const eventCollection = collection(db, 'events')
            addDoc(eventCollection, eventInfo).then(() =>{
                console.log('event added');
                window.location.href = '../index.html'
            })
        })
        
    });

    // console.log(imgRef);
});