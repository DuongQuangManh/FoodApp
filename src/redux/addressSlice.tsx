import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ADDRESS } from '../utils'
import { AddRessModel } from '../models';

export const fetchAddress = createAsyncThunk("address/getAddress", async (id: string) => {
    const res = await fetch(`${ADDRESS}/${id}`, { method: "GET", });
    if (res.status == 200) {
        let data = await res.json();
        return data;
    } else {
        return {
            error: "Lỗi gì ấy"
        }
    }
})

export const addAddress = createAsyncThunk("address/add", async ({ obj, user }: any) => {
    const res = await fetch(`${ADDRESS}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify(obj)
    });
    if (res.status == 201) {
        let data = await res.json();
        return data;
    } else if (res.status == 400) {
        return { error: "Thêm thất bại" }
    } else {
        return { error: "lỗi gì ấy" }
    }
})

const initialState = {
    data: [] as AddRessModel[],
    myLocation: [] as number[],
    loading: false,
    error: "" as string | undefined,
    locationSelect: {
        _id: "",
        details: "",
        longitude: 0,
        latitude: 0,
        id_user: "",
    } as AddRessModel,
}
const addRessSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.myLocation = action.payload;

        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLocationSelect: (state, action) => {
            state.locationSelect = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(addAddress.pending, state => {
            state.loading = true;
        }).addCase(addAddress.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error;
            } else {
                state.data = action.payload.data;
                state.error = action.payload.msg;
            }

        }).addCase(addAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        }).addCase(fetchAddress.pending, state => {
            state.loading = true;
        }).addCase(fetchAddress.fulfilled, (state, action) => {
            console.log("check")
            console.log(action.payload.data)
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error;
            } else {
                state.data = action.payload.data;
            }

        }).addCase(fetchAddress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})


export const { setLocation, setError, setLocationSelect } = addRessSlice.actions
export default addRessSlice.reducer;
