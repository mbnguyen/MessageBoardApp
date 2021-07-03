import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import {useAuthState} from 'react-firebase-hooks/auth';

const config = {
    apiKey: "AIzaSyBuaw0b03zKBYoUyadSnSbmYcGHtr9Cicc",
    authDomain: "message-board-app-259f7.firebaseapp.com",
    projectId: "message-board-app-259f7",
    storageBucket: "message-board-app-259f7.appspot.com",
    messagingSenderId: "572985925937",
    appId: "1:572985925937:web:46080ddd626cd546f59010"
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