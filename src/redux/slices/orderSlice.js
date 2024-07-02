import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from "../../utils/path/Path";
import { get, post, customget } from "../../utils/query/Query";



export const getOrder = createAsyncThunk('order', async (token) => {
  try {
    const response = await get(Endpoint.order, token)
    return response.data
  }
  catch (error) {
    return error.response.data.count
  }
})



export const getOrderDetails = createAsyncThunk('order-details', async (data) => {

  try {
    const response = await customget(Endpoint.orderDetais, data[0], data[1])
    return response.data
  }
  catch (error) {
    return error.response.data
  }
})

export const orderReceive = createAsyncThunk('change-order-ststus', async (data) => {
  try {
    const response = await customget(Endpoint.orderReceive, data[0], data[1])
    return response.data
  }
  catch (error) {
    return error.response.data
  }
})

export const getOrderByMerchant = createAsyncThunk('order-merchant', async (data) => {
  try {
    const response = await customget(Endpoint.orderMerchant, data[0], data[1])
    return response.data
  }
  catch (error) {
    return error.response.data
  }
})

export const branchOrderSacBarcodeDetails = createAsyncThunk('order-branch-sac-code', async (token) => {
  try {
    const response = await get(Endpoint.branchSacBarcodeDetails, token)
    return response.data
  }
  catch (error) {
    return error.response.data
  }
})

export const pickOrderToTheVan = createAsyncThunk('pick-order-2-van', async (data) => {
  try {
    const response = await customget(Endpoint.pickOrderToVan, data[0], data[1])
    return response.data
  }
  catch (error) {
    return error.response.data
  }
})

export const orderInTheVan = createAsyncThunk('pick-in-the-van', async (token) => {
  try {
    const response = await get(Endpoint.orderInVan, token)
    return response.data
  }
  catch (error) {
    return error.response.data
  }
})



const initialStateValues = {
  success: false,
  isLoading: false,
  data: [],
  isError: false,
  orderData: {},
  orderDetails: [],
  orderInside: {},
  orderMerchant: [],
  thisMerchant: {},
  branchHavetoScan : {},
  picktoVanData : {}
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialStateValues,

  reducers: {
    storeOrderMerchant: (state, action) => {
      state.thisMerchant = action.payload
    },
    storeOrderData: (state, action) => {
      state.orderData = action.payload
    },
    storeOrderInside: (state, action) => {
      state.orderInside = action.payload
    },
    storePicktoVanData : (state,action) =>{
      state.picktoVanData = action.payload
    }
  },

  extraReducers: (builder) => {
    // orderReceive

    builder.addCase(pickOrderToTheVan.fulfilled, (state, action) => {
      state.isLoading = false,
        state.branchHavetoScan =  state.branchHavetoScan.filter((item) => item.branch_sack_barcode !== state.picktoVanData.branch_sack_barcode)

    });

    builder.addCase(branchOrderSacBarcodeDetails.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(branchOrderSacBarcodeDetails.fulfilled, (state, action) => {
      state.isLoading = false,
        state.branchHavetoScan = action.payload.data

    });

    builder.addCase(branchOrderSacBarcodeDetails.rejected, (state, action) => {
      state.isError = true,
        state.isLoading = false
    });

    builder.addCase(orderReceive.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(orderReceive.fulfilled, (state, action) => {
      state.isLoading = false,
        state.isError = false,
        state.orderDetails = state.orderDetails.filter((item) => item.reference_id !== state.orderInside.reference_id)
      state.orderMerchant = state.orderMerchant.filter((item) => item.reference_id !== state.orderInside.reference_id)
      state.thisMerchant.count = state.thisMerchant.count - 1

    });

    builder.addCase(orderReceive.rejected, (state, action) => {
      state.isError = true,
        state.isLoading = false
    });

    builder.addCase(getOrderByMerchant.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(getOrderByMerchant.fulfilled, (state, action) => {
      state.isLoading = false,
        state.orderMerchant = action.payload.data

    });

    builder.addCase(getOrderByMerchant.rejected, (state, action) => {
      state.isError = true,
        state.isLoading = false
    });


    builder.addCase(getOrderDetails.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.isLoading = false,
        state.orderDetails = action.payload.data

    });

    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.isError = true,
        state.isLoading = false
    });

    builder.addCase(getOrder.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.isLoading = false,
        state.data = action.payload.data

    });

    builder.addCase(getOrder.rejected, (state, action) => {
      state.isError = true,
        state.isLoading = false
    });

  }
})



export const { storeOrderMerchant, storeOrderData, storeOrderInside ,storePicktoVanData} = orderSlice.actions

export default orderSlice.reducer