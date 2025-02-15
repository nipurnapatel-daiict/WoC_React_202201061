import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBnMN6zvDB5SBaB9ajB3ELxuZnpJzL1k3A",
    authDomain: "authentication-135c9.firebaseapp.com",
    projectId: "authentication-135c9",
    storageBucket: "authentication-135c9.firebasestorage.app",
    messagingSenderId: "23136390890",
    appId: "1:23136390890:web:21bb4047f7667e52315193"
};    

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
