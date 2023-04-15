import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductModel } from '../models'
import { PRODUCTS } from '../utils/api'

export const fetchProduct = createAsyncThunk("product/getProduct", async () => {
    const res = await fetch(PRODUCTS, { method: "GET" });
    const data = await res.json();
    return data;
})

const initialState = {
    data: [] as ProductModel[],
    loading: false,
    error: "" as string | undefined,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProduct.pending, state => {
            state.loading = true;
        }).addCase(fetchProduct.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.loading = false;
        }).addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default productSlice.reducer