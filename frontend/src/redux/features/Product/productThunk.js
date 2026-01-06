import { createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../../services/productServices";


export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async (arg, thunkAPI)=>{
        try{
            return await productService.getProducts()
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }

    }
)
export const fetchProductDetails = createAsyncThunk(
    'fetchProductDetails',
    async (id , thunkAPI) =>{
        try{
            return await productService.getProduct(id)
        }catch (error){
            return thunkAPI.rejectWithValue(error)
            
        }
    }
)