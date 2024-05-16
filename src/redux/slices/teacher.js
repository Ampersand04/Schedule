import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchGetForTeacher = createAsyncThunk(
	'auth/fetchGetForTeacher',
	async (params) => {
		const { data } = await axios.post('/schedule/teacher', params)
		return data
	}
)

const initialState = {
	data: null,
	status: 'state'
}

const getSlice = createSlice({
	name: 'getSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetForTeacher.pending, (state) => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(fetchGetForTeacher.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchGetForTeacher.rejected, (state) => {
				state.status = 'error'
				state.data = null
			})
	}
})

export const teacherReducer = getSlice.reducer
