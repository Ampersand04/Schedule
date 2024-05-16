import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchGetForClassroom = createAsyncThunk(
	'auth/fetchGetForClassroom',
	async (params) => {
		const { data } = await axios.post('/schedule/classroom', params)
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
			.addCase(fetchGetForClassroom.pending, (state) => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(fetchGetForClassroom.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchGetForClassroom.rejected, (state) => {
				state.status = 'error'
				state.data = null
			})
	}
})

export const classroomReducer = getSlice.reducer
