import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
    productSlice,
    userSlice,
    categoriesSlice,
    favoriteSlice,
    cartSlice,
    addressSlice,
    orderSlice,
    commentSlice
} from './index'

const store = configureStore({
    reducer: {
        productSlice,
        userSlice,
        categoriesSlice,
        favoriteSlice,
        cartSlice,
        addressSlice,
        orderSlice,
        commentSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }