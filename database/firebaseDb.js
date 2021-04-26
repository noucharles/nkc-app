import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDXX-t_FZ_RWXeqim2cXCUYXXoMXAuQsNA",
    authDomain: "crudreactnative-23f4f.firebaseapp.com",
    projectId: "crudreactnative-23f4f",
    storageBucket: "crudreactnative-23f4f.appspot.com",
    messagingSenderId: "508167715384",
    appId: "1:508167715384:web:6d7e62d41c5872863544cd"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;