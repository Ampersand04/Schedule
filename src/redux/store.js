import { configureStore } from '@reduxjs/toolkit'
import { studentReducer } from './slices/student'
import { teacherReducer } from './slices/teacher'
import { classroomReducer } from './slices/classroom'
// import { composeWithDevTools } from 'redux-devtools-extension';

const store = configureStore({
	reducer: {
		student: studentReducer,
		teacher: teacherReducer,
		classroom: classroomReducer
	}
})

export default store
