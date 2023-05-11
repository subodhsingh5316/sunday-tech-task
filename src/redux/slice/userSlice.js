import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  const userAPI = 'https://dummyjson.com/users'

export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
      const response = await axios.get(`https://dummyjson.com/users`)
      return response.data
    }
)

export const userSlice = createSlice({
    name:'user',
    initialState:{
        userData:[],
        loading:false,
        error:false
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(fetchUserById.pending, (state,action)=>{
            state.loading = true
            state.userData = []
            state.error = false
        })
        builder.addCase(fetchUserById.fulfilled, (state,action)=>{
            state.loading = false
            state.userData = action.payload
            state.error = false
        })
        builder.addCase(fetchUserById.rejected, (state,action)=>{
            state.loading = false
            state.userData = []
            state.error = true
        })
    }
})

export default userSlice.reducer;