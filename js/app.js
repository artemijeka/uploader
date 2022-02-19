import { uploader } from './uploader.js';
// import { initializeApp, firebase } from "firebase/app";
// import 'firebase/storage';



// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDXony1MZlCKbI_Z2SC3i0h804Pqk_XAg8",
//   authDomain: "uploader-abb1e.firebaseapp.com",
//   projectId: "uploader-abb1e",
//   storageBucket: "uploader-abb1e.appspot.com",
//   messagingSenderId: "82863010551",
//   appId: "1:82863010551:web:222cc3d58ee364a632d9f2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const storage = firebase.storage();
// console.log(storage);


uploader('#uploaderFile', {
  multi: true,
  accept: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  onUpload(files) {
    files.forEach(file => {
      // const ref = storage.ref(`images/${file.name}`);
      // const task = ref.put(file);

      // task.on('state_changed', snapshot => {
      //   const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log(percentage);
      // }, error => {
      //   console.log(error);
      // }, () => {
      //   console.log('Complete');
      // });
    });
  }
});