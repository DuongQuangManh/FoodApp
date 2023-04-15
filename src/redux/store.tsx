import { configureStore } from '@reduxjs/toolkit'
import {
    productSlice,
    userSlice,
    categoriesSlice,
    detailSlice
} from './index'

const store = configureStore({
    reducer: {
        productSlice,
        userSlice,
        categoriesSlice,
        detailSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }