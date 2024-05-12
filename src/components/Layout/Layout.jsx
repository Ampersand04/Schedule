import React, { useState } from 'react'
import Header from '../header/Header'
import Aside from '../aside/Aside'

const Layout = ({ title, children }) => {
	const [isAsideActive, setAsideActive] = useState(false)

	const toggleAside = () => {
		setAsideActive((prevState) => !prevState)
	}
	return (
		<>
			<Header title={title} toggleAside={toggleAside} />
			{children}

			<Aside isAsideActive={isAsideActive} />
		</>
	)
}

export default Layout
