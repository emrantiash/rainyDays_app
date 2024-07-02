import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from "../../utils/path/Path";
import { get, post, customget } from "../../utils/query/Query";



export const getDashBoardData = createAsyncThunk('order', async (token) => {
  try {
    const response = await get(Endpoint.getDeliveryDashboard, token)
    return response.data
  }
  catch (error) {
    return error.response.data.count
  }
})

export const assignedDetails = createAsyncThunk('assigned-details', async (data) => {
  try {
    const response = await customget(Endpoint.assignedDetails, data[0], data[1])
    return response.data
  }
  catch (error) {
    return error.response.data.count
  }
})

export const assignedDetailsMore = createAsyncThunk('assigned-details-more', async (data) => {
  try {
    const response = await customget(Endpoint.deliveryOrderDetails, data[0], data[1])
    return response.data
  }
  catch (error) {
    return error.response.data.count
  }
})

export const receiveTheOrder = createAsyncThunk('change-status', async (data) => {
  try {
    const response = await customget(Endpoint.ReceiveOrder, data[0], data[1])
    return response.data
  }
  catch (error) {
    return error.response.data.count
  }
})

export const orderDetailsCustomerWise = createAsyncThunk('order-details', async (data) => {
  try {
    const response = await customget(Endpoint.orderDetailsCustomerWise, data[0], data[1])
    return response.data
  }
  catch (error) {
    return error.response.data.count
  }
})

export const newPickDetails = createAsyncThunk('pick-details', async (data) => {
  try {
    const response = await customget(Endpoint.deliveryOrderDetails, data[0], data[1])
    return response.data
  }
  catch (error) {
    return error.response.data.count
  }
})

export const deliveryTheOrder = createAsyncThunk('change-status', async (data) => {
  try {
    const response = await customget(Endpoint.orderDelivery, data[0], data[1])
    return response.data
  }
  catch (error) {
    return error.response.data.count
  }
})

export const getDeliveryCOllection = createAsyncThunk('order', async (token) => {
  try {
    const response = await get(Endpoint.orderCollectionData, token)
    return response.data
  }
  catch (error) {
    return error.response.data.count
  }
})






const initialStateValues = {
  success: false,
  isLoading: false,
  data: [],
  areaData : [],
  item: {},
  thisCustomer : {},
  pickData : [],
  status : 0 , // 6 new page , 7 deliver
}

export const deliverySlice = createSlice({
  name: 'order',
  initialState: initialStateValues,

  reducers: {
    checkStatusPage : (state,action) =>{
     state.status = action.payload
    },
    storeThisItem: (state, action) => {
      state.item = action.payload
    },
    storeThisCustomer: (state, action) => {
      state.thisCustomer = action.payload
    }
  },

  extraReducers: (builder) => {
    

    builder.addCase(newPickDetails.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(newPickDetails.fulfilled, (state, action) => {
      state.isLoading = false,
        state.pickData = action.payload.data

    });

    builder.addCase(newPickDetails.rejected, (state, action) => {
      state.isError = true,
        state.isLoading = false
    });
   

    builder.addCase(assignedDetailsMore.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(assignedDetailsMore.fulfilled, (state, action) => {
      state.isLoading = false,
        state.areaData = action.payload.data

    });

    builder.addCase(assignedDetailsMore.rejected, (state, action) => {
      state.isError = true,
        state.isLoading = false
    });

    builder.addCase(getDashBoardData.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(getDashBoardData.fulfilled, (state, action) => {
      state.isLoading = false,
        state.data = action.payload.data

    });

    builder.addCase(getDashBoardData.rejected, (state, action) => {
      state.isError = true,
        state.isLoading = false
    });

  }
})



export const { checkStatusPage,storeThisItem,storeThisCustomer } = deliverySlice.actions

export default deliverySlice.reducer