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
    productSelect: {
        _id: "",
        name: "",
        img: "",
        id_theloai: "",
        id_cuahang: "",
        price: 0,
        description: "",
    } as ProductModel,
    txtSearch: "" as string,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addDetail: (state, action) => {
            state.productSelect = action.payload
        },
        setTxtSearch: (state, action) => {
            state.txtSearch = action.payload;
        }
    },
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

export const { addDetail, setTxtSearch } = productSlice.actions
export default productSlice.reducer