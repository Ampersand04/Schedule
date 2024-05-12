import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Aside.module.scss'

const Aside = ({ isAsideActive }) => {
	return (
		<aside className={isAsideActive ? styles.active : styles.aside}>
			<div className={styles.inner}>
				<nav className={styles.nav}>
					<p className={styles.title}>Настройки</p>
					<Link to="/db">
						<li>БД </li>
					</Link>

					<label className={styles.title}>Найти</label>

					<Link to="/students">
						<li>Для студентов</li>
					</Link>

					<Link to="/teacher">
						<li>Для преподавателей</li>
					</Link>

					<Link to="/classroom">
						<li>В кабинет</li>
					</Link>
				</nav>
			</div>
		</aside>
	)
}

export default Aside
