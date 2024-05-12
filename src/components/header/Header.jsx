import React from 'react'
import styles from './Header.module.scss'

const Header = ({ title, toggleAside }) => {
	return (
		<header>
			<p className={styles.title}>{title}</p>
			<img onClick={toggleAside} src="./burger.png" alt="" />
		</header>
	)
}

export default Header
