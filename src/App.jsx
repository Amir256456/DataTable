import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'
import { db } from './firebaseConfig'
function App() {
	const [notes, setNotes] = useState([])
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [educationDate, setEducationDate] = useState('2000-01-01')
	const [certificatedEndedDate, setCertificatedEndedDate] =
		useState('2000-01-01')

	const notesCollectionRef = collection(db, 'DataTable')

	const getNotes = async () => {
		const data = await getDocs(notesCollectionRef)
		setNotes(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
	}
	useEffect(() => {
		getNotes()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		await addDoc(notesCollectionRef, {
			name: name,
			surname: surname,
			educationDate: String(educationDate),
			certificatedEndedDate: String(certificatedEndedDate),
		})
		getNotes()
	}

	const deleteNote = async id => {
		const noteDoc = doc(db, 'DataTable', id)
		await deleteDoc(noteDoc)
		setNotes(notes.filter(note => note.id !== id))
	}

	return (
		<div className='container'>
			<form onSubmit={e => handleSubmit(e)}>
				<input
					type='text'
					onChange={e => setName(e.target.value)}
					value={name}
					placeholder='Имя'
				/>
				<input
					type='text'
					onChange={e => setSurname(e.target.value)}
					value={surname}
					placeholder='Фамилия'
				/>
				<input
					type='date'
					onChange={e => setEducationDate(e.target.value)}
					value={educationDate}
					placeholder='Обучение'
				/>
				<input
					type='date'
					onChange={e => setCertificatedEndedDate(e.target.value)}
					value={certificatedEndedDate}
					placeholder='Окончание сертификата'
				/>
				<button>Добавить</button>
			</form>

			<div className='table'>
				<div className='head'>
					<div className='item'>Имя</div>
					<div className='item'>Фамилия</div>
					<div className='item'>Обучения</div>
					<div className='item'>Сертификат</div>
					<div className='item'>
						<Trash2></Trash2>
					</div>
				</div>
				{notes.map(note => (
					<div className='row' key={note.id}>
						<div className='item'>{note.name}</div>
						<div className='item'>{note.surname}</div>
						<div className='item'>{note.educationDate}</div>
						<div className='item'>{note.certificatedEndedDate}</div>
						<button className='item' onClick={() => deleteNote(note.id)}>
							<Trash2 className='deleteIcon'></Trash2>
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default App
