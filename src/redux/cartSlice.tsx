import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CartModel } from '../models'
import { CART } from '../utils'

export const fetchCart = createAsyncThunk("cart/getCart", async (id_user: string) => {
    const res = await fetch(`${CART}/${id_user}`, { method: "GET" });
    if (res.status == 200) {
        const data = res.json();
        return data;
    } else {
        return { error: "Lỗi kết nối" }
    }
})

export const addCart = createAsyncThunk("cart/setCart", async ({ obj, user }: any) => {
    const res = await fetch(`${CART}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify(obj)
    });
    if (res.status == 201) {
        const data = res.json();
        return data;
    } else if (res.status == 404) {
        return { error: "Phiên hết hạn" }
    } else {
        return { error: "Kiểm tra lại đường truyền" }
    }
})

const initialState = {
    data: [] as CartModel[],
    count: 0 as number,
    error: "" as string | undefined,
    loading: false
}

const orderSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        },
        increQuantity: (state, action) => {
            state.data.map((item) => {
                if (item._id == action.payload) {
                    item.quantity += 1;
                }
            })
        },
        subQuantity: (state, action) => {
            state.data.map((item) => {
                if (item._id == action.payload) {
                    item.quantity -= 1;
                }
            })
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCart.pending, state => {
            state.loading = true;
        }).addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error
            } else {
                state.data = action.payload.data;
                state.count = action.payload.data.length;
            }
        }).addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        }).addCase(addCart.pending, state => {
            state.loading = true;
        }).addCase(addCart.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error
            } else {
                state.data = action.payload.data;
                state.count = action.payload.data.length;
                state.error = action.payload.msg;
            }
        }).addCase(addCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export const { setError, increQuantity, subQuantity } = orderSlice.actions
export default orderSlice.reducer