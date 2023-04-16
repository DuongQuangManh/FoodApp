import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { FavoriteModel } from '../models'
import { FAVORITE } from '../utils'

export const fetchFavorite = createAsyncThunk("favorite/getFavorite", async (id_user: string) => {
    console.log(id_user)
    const res = await fetch(`${FAVORITE}/${id_user}`, { method: "GET" })
    const data = await res.json();
    console.log("-----đây la data ở fetch------")

    return data;
})
export const addFavorite = createAsyncThunk("favorite/setFavorite", async ({ obj, user }: any) => {
    const res = await fetch(`${FAVORITE}/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify(obj)
    });
    if (res.status == 201) {
        const data = await res.json();

        return data
    } else if (res.status == 400) {
        return { msg: "Thêm vào danh sách yêu thích thất bại" }
    }
})

export const deleteFavorite = createAsyncThunk("favorite/removeFavorite", async ({ obj, user }: any) => {
    const res = await fetch(`${FAVORITE}/delete`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify(obj)
    });
    if (res.status == 201) {
        const data = await res.json();
        return data
    } else if (res.status == 400) {
        return { msg: "Thêm vào danh sách yêu thích thất bại" }
    }
})

const initialState = {
    data: [] as FavoriteModel[],
    loading: false,
    error: "" as string | undefined,
    count: 0,
}
const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchFavorite.pending, state => {
            state.loading = true;
        }).addCase(fetchFavorite.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.count = action.payload.data.length;
        }).addCase(fetchFavorite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).addCase(addFavorite.pending, state => {
            state.loading = true;
        }).addCase(addFavorite.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.count = action.payload.data.length;
        }).addCase(addFavorite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).addCase(deleteFavorite.pending, state => {
            state.loading = true;
        }).addCase(deleteFavorite.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.count = action.payload.data.length;
        }).addCase(deleteFavorite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default favoriteSlice.reducer