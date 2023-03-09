import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts:[]
}

const filterSlice = createSlice({
  name:"filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state,action){
        const {products, searchInput} = action.payload
        const tempProducts = products.filter(product => product.name.toLowerCase().includes(searchInput.toLowerCase()) || product.category.toLowerCase().includes(searchInput.toLowerCase()))
        state.filteredProducts=tempProducts;
    }
  }
});

export const {FILTER_PRODUCTS} = filterSlice.actions
export const selectFilteredProducts = (state)=> state.filter.filteredProducts;

export default filterSlice.reducer


