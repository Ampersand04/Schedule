import React from 'react'
import { Routes, Route } from 'react-router-dom'

// import { Home, About, Contacts, Login } from './pages'
import Student from './pages/Student/Student'
import Home from './pages/Home/Home'
import Database from './pages/Database/Database'
import Teacher from './pages/Teacher/Teacher'
import Classroom from './pages/Classroom/Classroom'

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/students" element={<Student />} />
				<Route path="/db" element={<Database />} />
				<Route path="/teacher" element={<Teacher />} />
				<Route path="/classroom" element={<Classroom />} />
			</Routes>
		</>
	)
}

export default App
