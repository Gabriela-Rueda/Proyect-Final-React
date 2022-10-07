import { createSlice } from '@reduxjs/toolkit';

export const IsLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
    setIsLoading:(state,action)=>{
        const isLoading = action.payload
        return isLoading
    }
    }
})

export const { setIsLoading } = IsLoadingSlice.actions;

export default IsLoadingSlice.reducer;
