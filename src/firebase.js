import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCg986RkHYrUQyyEKk31FR08DjRLqRh3Ww",
    authDomain: "administrate-contact-book.firebaseapp.com",
    databaseURL: "https://administrate-contact-book-default-rtdb.firebaseio.com",
    projectId: "administrate-contact-book",
    storageBucket: "administrate-contact-book.appspot.com",
    messagingSenderId: "381751760993",
    appId: "1:381751760993:web:b9446042bd47d536b5b220"
  };
  // Initialize Firebase
  var firebaseDB = firebase.initializeApp(firebaseConfig);
  export default firebaseDB.database().ref();
  //exporting db so it can be imported in other files