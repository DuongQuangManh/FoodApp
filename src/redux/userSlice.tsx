import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserModel } from '../models'
import { USER_LOGIN } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserLogin = createAsyncThunk("user/login", async ({ user, navi }: any) => {
    try {
        const res = await fetch(USER_LOGIN, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (res.status == 401) {
            return { error: "Tài khoản không tồn tại" }
        } else if (res.status == 400) {
            return { error: "Tài khoản hoặc mật khẩu không chính xác!" }
        } else if (res.status == 200) {
            let data = await res.json();
            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            navi();
            return data.user
        }
    } catch (error: any) {
        console.log(error.message)
        return Promise.reject("Vui lòng thử lại sau")
    }
})

const initialState = {
    data: {
        _id: "",
        firstname: "",
        lastname: "",
        email: "",
        passwd: "",
        img: "",
        status: true,
        position: false,
    } as UserModel,
    loading: false,
    error: "" as string | undefined,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUser: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: bulder => {
        bulder.addCase(fetchUserLogin.pending, state => {
            state.loading = true;
        }).addCase(fetchUserLogin.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error
            } else {
                state.data = action.payload
            }
        }).addCase(fetchUserLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export const { setError, setUser } = userSlice.actions
export default userSlice.reducer