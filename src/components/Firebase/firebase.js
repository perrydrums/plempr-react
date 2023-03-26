import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
  }

  // AUTH API.
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // TODO: Password update and reset.
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  // USER DATA API.
  doCreateUserData = (uid, username) => {
    const db = firebase.firestore();
    db.collection('users').doc().set({
      uid,
      username,
    });
  };

  getUserDataByUid = async (uid) => {
    const db = firebase.firestore();
    const snapshot = await db.collection('users').where('uid', '==', uid).get();
    const data = {};
    await snapshot.forEach((doc) => {
      data.uid = uid;
      data.username = doc.get('username');
    });
    return data;
  };

  // MESSAGE API.
  doCreateMessage = async (uid, message, audio, langcode) => {
    const db = firebase.firestore();
    const userData = await this.getUserDataByUid(uid);
    db.collection('messages').doc().set({
      message,
      audio,
      langcode,
      createdBy: uid,
      createdByName: userData.username,
      createdOn: Date.now(),
    });
  };

  getFirestore = () => firebase.firestore();
}

export default Firebase;
