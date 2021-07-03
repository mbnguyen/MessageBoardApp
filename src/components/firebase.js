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
		this.messageRefGeneral = this.db.collection("general");
		this.messageRefRandom = this.db.collection("random");
		this.queryGeneral = this.messageRefGeneral.orderBy('createdAt').limit(20);
		this.queryRandom = this.messageRefRandom.orderBy('createdAt').limit(20);
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		return this.auth.signOut()
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
		return name.get('fname')
	}

	async getUserFirstName(uid) {
		const name = await this.db.doc(`users/${uid}`).get()
		return name.get('fname')
	}

	async getCurrentUserDate() {
		const date = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return date.get('date');
	}

	async sendMessageGeneral(text, uid) {
		this.messageRefGeneral.add({
			text: text,
			createdAt: app.firestore.FieldValue.serverTimestamp(),
			uid
		});
	}

	async sendMessageRandom(text, uid) {
		this.messageRefRandom.add({
			text: text,
			createdAt: app.firestore.FieldValue.serverTimestamp(),
			uid
		});
	}

}

export default new Firebase()