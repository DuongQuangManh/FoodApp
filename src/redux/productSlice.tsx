import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ProductModel} from '../models';
import {PRODUCTS} from '../utils/api';

export const fetchProduct = createAsyncThunk(
  'product/getProduct',
  async (id: string) => {
    const res = await fetch(`${PRODUCTS}/get/${id}`, {method: 'GET'});
    const data = await res.json();
    return data;
  },
);

export const fetchProductFull = createAsyncThunk(
  'product/getProductFull',
  async ({id, limit}: any) => {
    const res = await fetch(`${PRODUCTS}/get/${id}?limit=${limit}`, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  },
);

export const searchProduct = createAsyncThunk(
  'product/searchProduct',
  async ({name, limit}: any) => {
    const res = await fetch(`${PRODUCTS}/search?name=${name}&limit=${limit}`, {
      method: 'GET',
    });
    if (res.status == 200) {
      const data = await res.json();
      return data;
    }
  },
);

const initialState = {
  data: [] as ProductModel[],
  dataPopular: [] as ProductModel[],
  loading: false,
  count: 0,
  error: '' as string | undefined,
  productSelect: {
    _id: '',
    name: '',
    img: '',
    id_theloai: '',
    id_cuahang: '',
    price: 0,
    description: '',
  } as ProductModel,
  txtSearch: '' as string,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addDetail: (state, action) => {
      state.productSelect = action.payload;
    },
    setTxtSearch: (state, action) => {
      state.txtSearch = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.dataPopular = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductFull.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductFull.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.count = action.payload.count;
        state.loading = false;
      })
      .addCase(fetchProductFull.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchProduct.pending, state => {
        state.loading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.count = action.payload.count;
        state.loading = false;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {addDetail, setTxtSearch} = productSlice.actions;
export default productSlice.reducer;
