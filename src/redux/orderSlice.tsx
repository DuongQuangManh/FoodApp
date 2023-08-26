import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {OrderModel} from '../models';
import {ORDER} from '../utils';
import {act} from 'react-test-renderer';

export const fetchOrder = createAsyncThunk(
  'order/getOrder',
  async ({id, status}: any) => {
    const res = await fetch(`${ORDER}/${id}?status=${status}`, {
      method: 'GET',
    });
    if (res.status == 200) {
      let data = await res.json();
      return data;
    } else {
      return {error: 'Có lỗi'};
    }
  },
);
export const fetchOrderMore = createAsyncThunk(
  'order/getOrderMore',
  async ({id, status, start, limit}: any) => {
    const res = await fetch(
      `${ORDER}/${id}?status=${status}&start=${start}&limit=${limit}`,
      {
        method: 'GET',
      },
    );
    if (res.status == 200) {
      let data = await res.json();
      return data;
    } else {
      return {error: 'Có lỗi'};
    }
  },
);
export const addOrder = createAsyncThunk('order/add', async (obj: any) => {
  const res = await fetch(`${ORDER}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  if (res.status == 201) {
    let data = await res.json();
    return data;
  } else {
    return {error: 'lỗi r'};
  }
});

const initialState = {
  data: [] as OrderModel[],
  error: '' as string | undefined,
  loading: false,
  count: 0,
  loadingmore: false,
  statusSelect: 1,
  methodpaySelect: 1,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setStatusSelect: (state, action) => {
      state.statusSelect = action.payload.id;
    },
    setMethodPaySelect: (state, action) => {
      state.methodpaySelect = action.payload.id;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrder.pending, state => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.data = action.payload.data;
          state.count = action.payload.count;
          state.error = action.payload.msg;
        }
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderMore.pending, state => {
        state.loadingmore = true;
      })
      .addCase(fetchOrderMore.fulfilled, (state, action) => {
        state.loadingmore = false;
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.data = [...state.data, ...action.payload.data];
          state.count = action.payload.count;
          state.error = action.payload.msg;
        }
      })
      .addCase(fetchOrderMore.rejected, (state, action) => {
        state.loadingmore = false;
        state.error = action.error.message;
      })
      .addCase(addOrder.pending, state => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.data = action.payload.data;
          state.error = action.payload.msg;
        }
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const {setStatusSelect, setMethodPaySelect} = orderSlice.actions;
export default orderSlice.reducer;
