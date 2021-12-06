import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyBhi9U8enoQsrbBF_coz9zM1hUnZOw4Yj4",
  authDomain: "seprojectgroup.firebaseapp.com",
  databaseURL: "https://seprojectgroup-default-rtdb.firebaseio.com",
  projectId: "seprojectgroup",
  storageBucket: "seprojectgroup.appspot.com",
  messagingSenderId: "583872555619",
  appId: "1:583872555619:web:34d2a5be93f001214e6656"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
