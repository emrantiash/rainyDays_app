import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from "../../utils/path/Path";
import { get ,post } from "../../utils/query/Query";



export const getLogin = createAsyncThunk('login', async (data) => {
  try {
    const response = await post(Endpoint.login, data,'')
    return response.data
  }
  catch (error) {

    return error.response.data
  }
}

)

const initialStateValues = {
  login:  false,
  success: false,
  isLoading: false,
  data: [],
  isError: false,
  token: "",
  msg : ""
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialStateValues,
  reducers: {
    signout: (state, action) => {
      state.login = false,
      state.success = false ,
      state.data = [],
      state.token = ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(getLogin.fulfilled, (state, action) => {
        state.isLoading = false,
        state.login = action.payload.success,
        state.data = action.payload,
        state.token = action.payload.token
        
    });

    builder.addCase(getLogin.rejected, (state, action) => {
      state.isError = true,
      state.isLoading = false,
      state.msg = "Network Error"
    });

  }
})



export const { signout } = loginSlice.actions

export default loginSlice.reducer


