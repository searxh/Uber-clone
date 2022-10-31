import { configureStore } from '@reduxjs/toolkit'
import navReducer from './slices/navSlice'
import fillReducer from './slices/fillSlice'

const Store = configureStore({
    reducer: {
        nav: navReducer,
        fill: fillReducer,
    },
})

export default Store;