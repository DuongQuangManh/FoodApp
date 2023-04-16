import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

export const connectSocket = createAsyncThunk("socket/connect", async () => {
    const socket = await io("http://192.168.1.3:3000/")
    return socket;
})
const initialState = {
    socket: null as any,
    error: "" as string | undefined
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(connectSocket.fulfilled, (state, action) => {
            state.socket = action.payload
        }).addCase(connectSocket.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export default socketSlice.reducer