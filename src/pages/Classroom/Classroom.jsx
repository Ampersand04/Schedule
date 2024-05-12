import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'

import styles from './Classroom.module.scss'
import Select from 'react-select'
import { fetchGetForClassroom } from '../../redux/slices/classroom'
import { Controller, useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'

const Classroom = () => {
	const dispatch = useDispatch()
	const selectClassroomData = useSelector((state) => state.classroom.data)
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			classroom: '',
			group_name: ''
		},
		mode: 'onSubmit'
	})

	const onSubmit = (formData) => {
		// Extract the value from each nested object in formData
		const refactoredFormData = Object.fromEntries(
			Object.entries(formData).map(([key, value]) => [key, value.value])
		)

		// Dispatch fetchGetForStudents action with refactored formData
		dispatch(fetchGetForClassroom(refactoredFormData))
		console.log(refactoredFormData)
	}

	const daysOfWeek = ['404']

	const classroomsOptions = daysOfWeek.map((day) => ({
		value: day,
		label: day
	}))
	const weekType = [
		{ value: 'Верхняя', label: 'Верхняя' },
		{ value: 'Нижняя', label: 'Нижняя' },
		{ value: '-', label: 'Верхняя и нижняя' }
	]
	const groupName = [
		{ value: 'ИИ-23', label: 'ИИ-23' },
		{ value: 'ИИ-24', label: 'ИИ-24' },
		{ value: 'ПО-10', label: 'ПО-10' },
		{ value: 'ПО-11', label: 'ПО-11' },
		{ value: 'АС-63', label: 'АС-63' },
		{ value: 'АС-64', label: 'АС-64' },
		{ value: 'Э-61', label: 'Э-61' },
		{ value: 'ПЭ-23', label: 'ПЭ-23' },
		{ value: 'МС-8', label: 'МС-8' }
	]
	return (
		<Layout title="В кабинет">
			<main className={styles.main}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<Controller
						name="classroom"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Аудитория"
								options={classroomsOptions}
							/>
						)}
						rules={{ required: 'Выберите аудиторию' }}
					/>
					{errors.classroom && (
						<span>{errors.classroom.message}</span>
					)}

					<Controller
						name="group_name"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Название группы"
								options={groupName}
							/>
						)}
						rules={{ required: 'Выберите название группы' }}
					/>
					{errors.group_name && (
						<span>{errors.group_name.message}</span>
					)}

					{/* Display errors if any */}

					{/* Submit button */}
					<button type="submit">Запросить</button>

					{selectClassroomData && (
						<section className={styles.output}>
							{selectClassroomData.map((data, index) => (
								<div className={styles.lesson} key={index}>
									<div className={styles.path} key={index}>
										<p>{data?.time}</p>
										<p>{data?.classroom}</p>
										<p>{data?.subgroup} подгруппа</p>
									</div>

									<div className={styles.path}>
										<p>{data?.subject}</p>
										<p>{data?.week_type}</p>
										<p>{data?.teacher}</p>
									</div>
								</div>
							))}
						</section>
					)}
				</form>
			</main>
		</Layout>
	)
}

export default Classroom
