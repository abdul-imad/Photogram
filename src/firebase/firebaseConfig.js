import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

export const auth = firebase
	.initializeApp({
		apiKey: "AIzaSyDZdU1TwyagBFAoH1ogl3EkCO9o2Fsmv3M",
		authDomain: "photo-gallery-467b7.firebaseapp.com",
		projectId: "photo-gallery-467b7",
		storageBucket: "photo-gallery-467b7.appspot.com",
		messagingSenderId: "746941764083",
		appId: "1:746941764083:web:a936768846448510490286",
	})
	.auth();

export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
