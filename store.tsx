import { configureStore } from '@reduxjs/toolkit'
import navReducer from './slices/navSlice'

const Store = configureStore({
    reducer: {
        nav: navReducer,
    },
})

export default Store;