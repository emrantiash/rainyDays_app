import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from "../../utils/path/Path";
import { get, post, customget } from "../../utils/query/Query";



export const getStoreCheckOrder = createAsyncThunk('store', async (data) => {
    try {
        const response = await customget(Endpoint.storeOrderCheck, data[0], data[1])
        return response.data
    }
    catch (error) {

        return error.response.data
    }
}

)

export const getStoreCheckOrderDetails = createAsyncThunk('store-details', async (data) => {
    try {
        const response = await customget(Endpoint.storeOrderDetails, data[0], data[1])
        return response.data
    }
    catch (error) {

        return error.response.data
    }
})

export const StoreChangeOrderStatus = createAsyncThunk('store-change-status', async (data) => {
    try {
        const response = await customget(Endpoint.storeChngeOrderStatus, data[0], data[1])
        return response.data
    }
    catch (error) {

        return error.response.data
    }
})

export const StoredDataBranchWise = createAsyncThunk('store-data', async (token) => {
    try {
        const response = await get(Endpoint.storeDataBranchWise,token )
        console.log(response.data)
        return response.data
    }
    catch (error) {

        return error.response.data
    }
})

export const StoredAreaDataBranchWise = createAsyncThunk('area-data-branch-wise', async (data) => {
    try {
        const response = await customget(Endpoint.storeAreaDataBranchWise, data[0], data[1])
        return response.data
    }
    catch (error) {

        return error.response.data
    }
})

export const StoredAreaDataSacCode = createAsyncThunk('area-data-sac-code', async (data) => {
    try {
        const response = await post(Endpoint.storeOrderAreaSacCode,data[0],data[1])
        return response.data
    }
    catch (error) {

        return error.response.data
    }
})

export const StoredBranchDataSacCode = createAsyncThunk('branch-data-sac-code', async (data) => {
    try {
        const response = await post(Endpoint.storeOrderBranchSacCode,data[0],data[1])
        return response.data
    }
    catch (error) {

        return error.response.data
    }
})



const initialStateValues = {
    login: false,
    success: false,
    isLoading: true,
    data: [],
    order: [],
    isError: false,
    thisman: {},
    barcode: "",
    msg: "",
    branch : {},
    area : {},
    areasac : false ,
    araesaclength : 0
}

export const storeSlice = createSlice({
    name: 'store',
    initialState: initialStateValues,
    reducers: {
        storeData: (state, action) => {
            state.thisman = action.payload
        },
        storeBarcode: (state, action) => {
            state.barcode = action.payload
        },
        storeBranch: (state, action) => {
            state.branch = action.payload
        },
        storeArea: (state, action) => {
            state.area = action.payload
        },
        areaSacStatus : (state,action)=>{
            state.areasac = action.payload[0],
            state.araesaclength = action.payload[1]
        }
    },
    extraReducers: (builder) => {
        // StoreChangeOrderStatus
        builder.addCase(StoreChangeOrderStatus.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(StoreChangeOrderStatus.fulfilled, (state, action) => {
            state.isLoading = false
                 state.order =  action.payload &&  action.payload.data && state.order.filter((item) => item.barcode !== action.payload.data.barcode)

        });

        builder.addCase(StoreChangeOrderStatus.rejected, (state, action) => {
            state.isError = true,
                state.isLoading = false,
                state.msg = "Network Error"
        });
        builder.addCase(getStoreCheckOrderDetails.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(getStoreCheckOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false,
                state.order = action.payload.data

        });

        builder.addCase(getStoreCheckOrderDetails.rejected, (state, action) => {
            state.isError = true,
                state.isLoading = false
        });

        builder.addCase(getStoreCheckOrder.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(getStoreCheckOrder.fulfilled, (state, action) => {
            state.isLoading = true
            state.data = action.payload.data

        });

        builder.addCase(getStoreCheckOrder.rejected, (state, action) => {
            state.isError = true,
                state.isLoading = false,
                state.msg = "Network Error"
        });

    }
})



export const { storeData, storeBarcode,storeBranch ,storeArea} = storeSlice.actions

export default storeSlice.reducer


