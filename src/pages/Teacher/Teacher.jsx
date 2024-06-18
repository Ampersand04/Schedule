import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'

import styles from './Teacher.module.scss'
import Select from 'react-select'
import { fetchGetForTeacher } from '../../redux/slices/teacher'
import { Controller, useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'

const Teacher = () => {
	const dispatch = useDispatch()
	const selectTeacherData = useSelector((state) => state.teacher.data)
	const selectTeacherStatus = useSelector((state) => state.teacher.status)
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			teacher: '',
			week_type: '',
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
		dispatch(fetchGetForTeacher(refactoredFormData))
		console.log(refactoredFormData)
	}

	const fio = [
		'Березуцкая А.О.',
		'Боровикова Н.А.',
		'Буслюк В.В.',
		'Вабищевич А.И.',
		'Вакулич Н.А.',
		'Данилов Ю.Д.',
		'Войцехович Г.Ю.',
		'Гирель Т.Н.',
		'Гладкий И.И.',
		'Демидович А.Г.',
		'Дереченник С.С.',
		'Захарченко Л.А.',
		'Защук Е.Н.',
		'Ипатова О.В.',
		'Козинский А.А.',
		'Костомаров В.А.',
		'Крагель Е.А.',
		'Лапука А.С.',
		'Макаренко Е.В.',
		'Малыхина Л.Ю.',
		'Маркевич К.М.',
		'Михно Е.В.',
		'Михняев А.Л',
		'Монтик Н.С.',
		'Муравьёв Г.Л.',
		'Парфомук С.И.',
		'Рахуба В.И.',
		'Резько П.Н.',
		'Гуринович Т.В.',
		'Савицкий Ю.В.',
		'Савонюк В.А.',
		'Савчук О.Ф.',
		'Самолюк О.Ю.',
		'Сидак С.В.',
		'Ситковец Я.С.',
		'Склипус А.А.',
		'Смаль А.С.',
		'Степанчук В.И.',
		'Угляница И.В.',
		'Хацкевич М.В.',
		'Хведчук В.И.',
		'Хвещук В.И.',
		'Четверкина Г.А.',
		'Шульган А.А.',
		'Юхимук М.М.'
	]

	const fioOptions = fio.map((day) => ({
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
		<Layout title="Для преподавателей">
			<main className={styles.main}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<Controller
						name="teacher"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="ФИО"
								options={fioOptions}
							/>
						)}
						rules={{ required: 'Выберите ФИО' }}
					/>
					{errors.teacher && <span>{errors.teacher.message}</span>}
					<Controller
						name="week_type"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Тип недели"
								options={weekType}
							/>
						)}
						rules={{ required: 'Выберите тип недели' }}
					/>
					{errors.week_type && (
						<span>{errors.week_type.message}</span>
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

					{console.log(useSelector((state) => state.teacher))}

					{selectTeacherData ? (
						<section className={styles.output}>
							{selectTeacherData.length > 0 ? (
								selectTeacherData?.map((data, index) => (
									<div className={styles.lesson} key={index}>
										<div
											className={styles.path}
											key={index}
										>
											<b>{data?.day_of_week}</b>
											<p>{data?.time}</p>
											<p>{data?.classroom}</p>
											{/* <p>{data?.group_name}</p> */}
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
					) : selectTeacherData === null &&
					  selectTeacherStatus === 'loading' ? (
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

export default Teacher
