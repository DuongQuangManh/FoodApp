import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CommentModel } from '../models'
import { COMMENT } from '../utils'


export const fetchComment = createAsyncThunk("comment/getComment", async () => {
    const res = await fetch(`${COMMENT}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.status == 200) {
        const data = await res.json();
        return data;
    } else {
        return { error: "lỗi" }
    }

})

export const addComment = createAsyncThunk("comment/add", async ({ user, obj }: any) => {
    const res = await fetch(`${COMMENT}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify(obj)
    })
    if (res.status == 201) {
        const data = await res.json();
        return data;
    } else {
        return { error: "Lỗi" }
    }
})

const initialState = {
    data: [] as CommentModel[],
    loading: false,
    error: "" as string | undefined
}
const CommentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchComment.pending, state => {
            state.loading = true;
        }).addCase(fetchComment.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error
            }
            state.data = action.payload.data;

        }).addCase(fetchComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).addCase(addComment.pending, state => {
            state.loading = true;
        }).addCase(addComment.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error
            }
            state.data = action.payload.data;

        }).addCase(addComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default CommentSlice.reducer