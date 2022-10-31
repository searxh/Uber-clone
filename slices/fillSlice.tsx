import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    originFill: null,
    destinationFill: null,
}

export const fillSlice = createSlice({
    name:'fill',
    initialState,
    reducers: {
        setOriginFill: (state,action) => {
            state.originFill = action.payload
        },
        setDestinationFill: (state,action) => {
            state.destinationFill = action.payload
        }
    },
})

export const { setOriginFill, setDestinationFill } = fillSlice.actions

export const selectOriginFill = (state:any) => state.fill.originFill
export const selectDestinationFill = (state:any) => state.fill.destinationFill

export default fillSlice.reducer;