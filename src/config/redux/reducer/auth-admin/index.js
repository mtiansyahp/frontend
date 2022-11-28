import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as constants from '../../../../constants'

export const authAdmin = createAsyncThunk("auth-admin/auth", async(data) => {
    //untuk mengambil token
    //data.token
    const response = await axios.post(`${constants.base_url}/auth`, data);
    return response.data;
})

export const refreshTokenAdmin = createAsyncThunk("auth-admin/refresh-token-admin", async() => {
    const response = await axios.get(`${constants.base_url}/auth/token`);
    return response.data;
})

export const getTimeServer = createAsyncThunk("auth-admin/get-time", async() => {
    const response = await axios.get(`${constants.base_url}/auth/get-time-server`);
    return response.data;
})

export const logoutAdmin = createAsyncThunk("auth-admin/logout", async() => {
    const response = await axios.delete(`${constants.base_url}/auth/logout`);
    return response.data;
})

const initialState = {
    stateAuthAdmin : {
        status: 'idle',
        error: null
    }
}

const admin = createSlice({
    name: 'authAdmin',
    initialState,
    extraReducers:{
        [authAdmin.pending]: (state, action) => {
            state.stateAuthAdmin.status = 'loading'
        },
        [authAdmin.fulfilled]: (state, action) => {
            state.stateAuthAdmin.status = 'succeeded'
        },
        [authAdmin.rejected]: (state, action) => {
            state.stateAuthAdmin.status = 'failed'
            state.stateGetAllBottom.error = action.error.message
        },
    }
});

export default admin.reducer;