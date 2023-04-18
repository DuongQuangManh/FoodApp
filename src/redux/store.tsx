import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
    productSlice,
    userSlice,
    categoriesSlice,
    favoriteSlice,
    cartSlice
} from './index'

const store = configureStore({
    reducer: {
        productSlice,
        userSlice,
        categoriesSlice,
        favoriteSlice,
        cartSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }