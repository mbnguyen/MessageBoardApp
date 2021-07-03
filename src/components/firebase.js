import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import {useAuthState} from 'react-firebase-hooks/auth';

const config = {
    apiKey: "AIzaSyA9eZ6daf0XvhxuCOfS-dDcdOhQGxOzY8U",
    authDomain: "chat-app-67999.firebaseapp.com",
    projectId: "chat-app-67999",
    storageBucket: "chat-app-67999.appspot.com",
    messagingSenderId: "521082067632",
    appId: "1:521082067632:web:59584113b83fa30c28b975"
};

class Firebase {

	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.firestore();
		this.messageRef = this.db.collection("messages");
		this.query = this.messageRef.orderBy('createdAt').limit(20);
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		return this.auth.signOut()
	}

	addMessage(msg) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`messages/message`).set({
			msg
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.email;
	}

	async getCurrentUserRole() {
		const role = await this.db.doc(`users/${this.auth.currentUser.uid}`).get();
		return role.get('role');
	}

	async getCurrentUserFirstName() {
		const name = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return name.get('firstName')
	}

	async getCurrentUserDate() {
		const date = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return date.get('date');
	}

	async sendMessage(text, uid) {
		this.messageRef.add({
			text: text,
			createdAt: app.firestore.FieldValue.serverTimestamp(),
			uid
		});
	}

}

export default new Firebase()