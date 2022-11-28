import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as constants from '../../../../constants'

export const loginCustomerOtp = createAsyncThunk("auth-customer/login-otp", async(data) => {
    const response = await axios.post(`${constants.base_url}/auth/login-otp`, data);
    return response.data;
})

export const verifyCustomerOtp = createAsyncThunk("auth-customer/verify-otp", async(data) => {
    const response = await axios.post(`${constants.base_url}/auth/verify-otp`, data);
    return response.data;
})

export const refreshTokenCustomer = createAsyncThunk("auth-customer/refresh-token-customer", async() => {
    const response = await axios.get(`${constants.base_url}/auth/token-customer`);
    return response.data;
})

export const logoutCustomer = createAsyncThunk("auth-customer/logout-customer", async() => {
    const response = await axios.delete(`${constants.base_url}/auth/logout-customer`);
    return response.data;
})

const initialState = {
    stateLoginOtp : {
        status: 'idle',
        error: null
    },
    stateVerifyOtp : {
        status: 'idle',
        error: null
    }
}

const customer = createSlice({
    name: 'authCustomer',
    initialState,
    extraReducers:{
        [loginCustomerOtp.pending]: (state, action) => {
            state.stateLoginOtp.status = 'loading'
        },
        [loginCustomerOtp.fulfilled]: (state, action) => {
            state.stateLoginOtp.status = 'succeeded'
        },
        [loginCustomerOtp.rejected]: (state, action) => {
            state.stateLoginOtp.status = 'failed'
            state.stateLoginOtp.error = action.error.message
        },
        
        [verifyCustomerOtp.pending]: (state, action) => {
            state.stateVerifyOtp.status = 'loading'
        },
        [verifyCustomerOtp.fulfilled]: (state, action) => {
            state.stateVerifyOtp.status = 'succeeded'
        },
        [verifyCustomerOtp.rejected]: (state, action) => {
            state.stateVerifyOtp.status = 'failed'
            state.stateVerifyOtp.error = action.error.message
        },

    }
});

export default customer.reducer;