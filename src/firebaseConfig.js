import { getFirestore } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
	apiKey: 'AIzaSyDs-QWUJirTtBS2mXaBgDljNxBwPJ-4P-Q',
	authDomain: 'datatable-9c1bc.firebaseapp.com',
	projectId: 'datatable-9c1bc',
	storageBucket: 'datatable-9c1bc.appspot.com',
	messagingSenderId: '475118814824',
	appId: '1:475118814824:web:71e520db2d83e6ee391ddd',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
