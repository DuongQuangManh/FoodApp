import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CategoryModel } from '../models'
import { CATEGORY } from '../utils'

export const fetchCategory = createAsyncThunk("category/getCate", async () => {
    const res = await fetch(CATEGORY, { method: "GET", })
    const data = await res.json();
    return data;
})

const initialState = {
    data: [] as CategoryModel[],
    loading: false,
    cateSelect: "64a391f4487c6f2aa1806306" as string,
    nameSelect: "Foods" as string,
    error: "" as string | undefined
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setSelect: (state, action) => {
            console.log(action.payload)
            state.cateSelect = action.payload._id;
            state.nameSelect = action.payload.name;
        }
    },
    extraReducers: bulder => {
        bulder.addCase(fetchCategory.pending, state => {
            state.loading = true;
        }).addCase(fetchCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data
        }).addCase(fetchCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export const { setSelect } = categorySlice.actions
export default categorySlice.reducer