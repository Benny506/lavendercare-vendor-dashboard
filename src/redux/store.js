import { configureStore } from '@reduxjs/toolkit'
import appLoadingSlice from './slices/appLoadingSlice'
import userDetailsSlice from './slices/userDetailsSlice'

const store = configureStore({
    reducer: {
        appLoadingSlice,
        userDetailsSlice
    }
})

export default store