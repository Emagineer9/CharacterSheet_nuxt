import firebase from "firebase/app"

if (!firebase.apps.length) {
firebase.initializeApp({
  apiKey: "AIzaSyBmydph-SKZqbyN_Mn4_iOa_Z0BPc7TDVo",
  authDomain: "fusecharat-359c7.firebaseapp.com",
  databaseURL: "https://fusecharat-359c7.firebaseio.com",
  projectId: "fusecharat-359c7",
  storageBucket: "fusecharat-359c7.appspot.com",
  messagingSenderId: "90818676759",
  appId: "1:90818676759:web:f45c03aeaeadb224fc3452",
  measurementId: "G-R5624M1C35"
})
}

export default firebase
