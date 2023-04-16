import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { OrderModel } from '../models'


const initialState = {
    data: [] as OrderModel[],
    error: "" as string | undefined,
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
})

export default orderSlice.reducer