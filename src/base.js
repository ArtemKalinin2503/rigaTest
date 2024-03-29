import Rebase from 're-base';
import firebase from "firebase";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: "1:152882243560:web:8f07184f6ce4541593265d",
    measurementId: "G-HR2TTJQ6D4"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export { base }
