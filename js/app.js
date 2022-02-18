import { uploader } from './uploader.js';
import firebase from "firebase/app";
import 'firebase/storage';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChRbCtPUWdH1Ak18tsK4RFh6fRIZhjPp8",
  authDomain: "uploader-d6e0f.firebaseapp.com",
  projectId: "uploader-d6e0f",
  storageBucket: "uploader-d6e0f.appspot.com",
  messagingSenderId: "1019863173190",
  appId: "1:1019863173190:web:78a8b2d2d2130eb068e247"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();


uploader('#uploaderFile', {
  multi: true,
  accept: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  onUpload(files) {
    files.forEach(file => {
      const ref = storage.ref(`images/${file.name}`);
      const task = ref.put(file);

      task.on('state_changed', snapshot => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
      }, error => {
        console.log(error);
      }, () => {
        console.log('Complete');
      });
    });
  }
});