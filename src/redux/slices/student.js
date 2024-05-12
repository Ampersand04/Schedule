import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchGetForStudents = createAsyncThunk(
	'auth/fetchGetForStudents',
	async (params) => {
		const { data } = await axios.post('/schedule/filter', params)
		return data
	}
)

const initialState = {
	data: null,
	status: 'loading'
}

const getSlice = createSlice({
	name: 'getSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetForStudents.pending, (state) => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(fetchGetForStudents.fulfilled, (state, action) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchGetForStudents.rejected, (state) => {
				state.status = 'error'
				state.data = null
			})
	}
})

export const studentReducer = getSlice.reducer
