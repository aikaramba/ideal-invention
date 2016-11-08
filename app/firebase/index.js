import firebase from 'firebase';

try {
  var config = {
      apiKey: "AIzaSyBBNTMOi2WqlsDrshv8hJ-5nzic-wexezM",
      authDomain: "aika-todo-app.firebaseapp.com",
      databaseURL: "https://aika-todo-app.firebaseio.com",
      storageBucket: "aika-todo-app.appspot.com",
      messagingSenderId: "990322829279"
  };

  firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
