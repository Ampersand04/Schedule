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
	const selectClassroomStatus = useSelector((state) => state.classroom.status)
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

	const classroom = [
		'103',
		'303',
		'311',
		'329',
		'409',
		'412',
		'425',
		'433',
		'2/109',
		'2/118',
		'2/212',
		'2/213',
		'2/300',
		'2/303',
		'2/309',
		'2/106',
		'2/310',
		'2/316',
		'2/401а',
		'2/402',
		'2/403',
		'2/409',
		'2/410б',
		'2/411',
		'5/303',
		'512+',
		'Филиал'
	]

	const classroomsOptions = classroom.map((day) => ({
		value: day,
		label: day
	}))
	const daysOfWeek = [
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота'
	]

	const daysOptions = daysOfWeek.map((day) => ({
		value: day,
		label: day
	}))
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
						name="day_of_week"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="День недели"
								options={daysOptions}
							/>
						)}
						rules={{ required: 'Выберите день недели' }}
					/>
					{errors.day_of_week && (
						<span>{errors.day_of_week.message}</span>
					)}

					{/* Display errors if any */}

					{/* Submit button */}
					<button type="submit">Запросить</button>

					{/* {selectClassroomData ? (
						<section className={styles.output}>
							{selectClassroomData?.map((data, index) => (
								<div className={styles.lesson} key={index}>
									<div className={styles.path} key={index}>
										<p>{data?.time}</p>
										<p>{data?.classroom}</p>
										<p>{data?.group_name}</p>
									</div>

									<div className={styles.path}>
										<p>{data?.subject}</p>
										<p>{data?.week_type}</p>
										<p>{data?.teacher}</p>
									</div>
								</div>
							))}
						</section>
					) : selectClassroomStatus === 'loading' ? (
						<section className={styles.output}>
							<Audio
								height="80"
								width="80"
								radius="9"
								color="green"
								ariaLabel="loading"
								wrapperStyle
								wrapperClass
							/>
						</section>
					) : (
						''
					)} */}

					{selectClassroomData ? (
						<section className={styles.output}>
							{selectClassroomData.length > 0 ? (
								selectClassroomData?.map((data, index) => (
									<div className={styles.lesson} key={index}>
										<div
											className={styles.path}
											key={index}
										>
											<p>{data?.time}</p>
											<p>{data?.classroom}</p>
											<p>{data?.group_name}</p>
										</div>

										<div className={styles.path}>
											<p>{data?.subject}</p>
											<p>{data?.week_type}</p>
											<p>{data?.teacher}</p>
										</div>
									</div>
								))
							) : (
								<p>Данных нет!</p>
							)}
						</section>
					) : selectClassroomData === null &&
					  selectClassroomStatus === 'loading' ? (
						<section className={styles.output_loader}>
							<div className={styles.lesson}></div>
							<div className={styles.lesson}></div>
							<div className={styles.lesson}></div>
							<div className={styles.lesson}></div>
							<div className={styles.lesson}></div>
						</section>
					) : (
						''
					)}
				</form>
			</main>
		</Layout>
	)
}

export default Classroom
