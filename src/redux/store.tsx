import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
    productSlice,
    userSlice,
    categoriesSlice,
    favoriteSlice,
    cartSlice,
    addressSlice
} from './index'

const store = configureStore({
    reducer: {
        productSlice,
        userSlice,
        categoriesSlice,
        favoriteSlice,
        cartSlice,
        addressSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }