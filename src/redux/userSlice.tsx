import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {UserModel} from '../models';
import {USER, USER_LOGIN, USER_LOGOUT} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AES} from 'react-native-crypto-js';
// import dotenv from 'dotenv';
// dotenv.config();

// const KEY_BI_MAT = process.env.KEY_BI_MAT || '';r
// const IV = process.env.IV;

export const fetchUserLogin = createAsyncThunk(
  'user/login',
  async ({user}: any) => {
    try {
      const res = await fetch(USER_LOGIN, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status == 401) {
        return {error: 'Tài khoản không tồn tại'};
      } else if (res.status == 400) {
        return {error: 'Tài khoản hoặc mật khẩu không chính xác!'};
      } else if (res.status == 200) {
        let data = await res.json();
        // const pas = AES.encrypt(data.passwd, KEY_BI_MAT, {IV}).toString();

        await AsyncStorage.setItem('user', JSON.stringify(data.data));
        return data;
      }
    } catch (error: any) {
      console.log(error.message);
      return Promise.reject('Vui lòng thử lại sau');
    }
  },
);

export const fetchLogout = createAsyncThunk(
  'user/logout',
  async ({user, goToLogin}: any) => {
    const res = await fetch(`${USER_LOGOUT}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });
    if (res.status == 200) {
      await AsyncStorage.removeItem('user');
      goToLogin();
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({formData, user}: any) => {
    const res = await fetch(`${USER}/update/${user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    if (res.status == 200) {
      let data = await res.json();
      await AsyncStorage.setItem('user', JSON.stringify(data.data));
      console.log(data);
      return data;
    } else {
      return {error: 'Có lỗi '};
    }
  },
);

export const changePass = createAsyncThunk(
  'user/changepass',
  async ({id, pass}: any) => {
    const res = await fetch(`${USER}/changepass/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pass),
    });
    if (res.status == 200) {
      const data = await res.json();
      return data.msg;
    } else {
      return 'mật khẩu cũ không chính xác';
    }
  },
);

export const signUp = createAsyncThunk('user/signup', async (obj: any) => {
  const res = await fetch(`${USER}/reg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  if (res.status == 201) {
    let data: any = await res.json();
    return {data: data, msg: 'Tạo tài khoản thành công'};
  } else {
    return {error: 'Lỗi gì ấy'};
  }
});

const initialState = {
  data: {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    passwd: '',
    phone: '',
    img: '',
    status: true,
    position: false,
    token: '',
  } as UserModel,
  loading: false,
  error: '' as string | undefined,
  token: '' as string,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserLogin.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        console.log('---------------đây là log check login--------------');
        console.log('user: ');
        console.log(action.payload.data);
        console.log('token');
        console.log(action.payload.token);
        console.log('---------------------------------------------------');
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.data = action.payload.data;
          state.token = action.payload.token;
        }
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.data = action.payload.data;
          state.token = action.payload.token;
          state.error = action.payload.msg;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signUp.pending, state => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.data = action.payload.data.user;
          state.token = action.payload.data.token;
          state.error = action.payload.msg;
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changePass.pending, state => {
        state.loading = true;
      })
      .addCase(changePass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setError, setUser} = userSlice.actions;
export default userSlice.reducer;
