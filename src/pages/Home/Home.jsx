import React from 'react'
import styles from './Home.module.scss'
import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<main className={styles.main}>
			<div className={styles.inner}>
				<img src="deadline.png" alt="" />

				{/* <h1>frfw</h1> */}
				<p>
					Пользуйся расписанием чтобы все успеть! Занятия для тебя и
					для преподавателя
				</p>

				<Link to="/students">
					<button>Начнём!</button>
				</Link>
			</div>
		</main>
	)
}

export default Home
