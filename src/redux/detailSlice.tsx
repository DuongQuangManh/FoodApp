import { createSlice } from '@reduxjs/toolkit'
import { ProductModel } from '../models'

const initialState = {
    product: {
        _id: "",
        name: "",
        img: "",
        id_theloai: "",
        price: 0,
        description: "",
    } as ProductModel,
}

const detailsSlice = createSlice({
    name: "details",
    initialState,
    reducers: {
        addDetail: (state, action) => {
            state.product = action.payload
        }
    }
})
export const { addDetail } = detailsSlice.actions
export default detailsSlice.reducer