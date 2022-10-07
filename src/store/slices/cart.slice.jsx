import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './IsLoading.slice';
import axios from 'axios';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
     setCart: (state,action)=>{
        const cart=action.payload
        return cart
     },
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        .catch((error) => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addProductsThunk = (productCart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", productCart, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch((error) => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig() )
        .then(() => dispatch(setCart([])))
        .catch((error) => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteProductThunk = (deleteProduct) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${deleteProduct}`, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch((error) => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}


export const { setCart, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
