// store/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance'; 
const initialState = {
  products: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
  currentPage: 1, 
  totalPages: 1, 
  totalProducts: 0,
  currentProduct: null, 
  searchResults: [],
}; 

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

    fetchProductsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload.products;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalProducts = action.payload.totalProducts;
    },
    fetchProductsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
      // console.log("action.payload:", action.payload);
    },
    removeProduct(state, action) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateProduct(state, action) {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProductsFromState(state, action) {
      state.products = state.products.filter(
        (product) => !action.payload.includes(product._id)
      );
    },

    setSelectedCategory(state, action) {
      // console.log("Selected Category:", action.payload); 
      state.selectedCategory = action.payload;
    },

    fetchSingleProductSuccess(state, action) {
      state.currentProduct = action.payload;
    },

    searchProductsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    searchProductsSuccess(state, action) {
      state.isLoading = false;
      state.searchResults = action.payload;
    },
    searchProductsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

  },
});

// Actions
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProduct,
  removeProduct,
  updateProduct,
  deleteProductsFromState,
  setSelectedCategory,
  fetchSingleProductSuccess,
  searchProductsStart,
  searchProductsSuccess,
  searchProductsFailure,
} = productsSlice.actions;

// Async Thunks


const api = process.env.NEXT_PUBLIC_API_URL;

// Search products by query
export const searchProducts = (query) => async (dispatch) => {
  dispatch(searchProductsStart());
  try {
    const response = await axios.get(`${api}/api/products/search?term=${query}`);
    dispatch(searchProductsSuccess(response.data));
  } catch (error) {
    dispatch(searchProductsFailure(error.message));
  }
};


// Fetch products from API
export const fetchSingleProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${api}/api/products/${id}`);
    dispatch(fetchSingleProductSuccess(response.data));
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}
export const fetchProducts = (page = 1, limit = 10, category = null) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    // Create a URLSearchParams instance
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add the category parameter if it exists
    if (category) {
      queryParams.append("category", category);
    }

    // Convert to string for the query
    const query = queryParams.toString();

    // console.log("Request query:", query); // Debug log
    const response = await axios.get(`${api}/api/products?${query}`);
    
    dispatch(
      fetchProductsSuccess({
        products: response.data.products,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalProducts: response.data.totalProducts,
      })
    );
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};



// Add new product
export const createProduct = (product) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`${api}/api/products`, product,  { withCredentials: true });
    // console.log("response:", response.data)
    dispatch(addProduct(response.data.product));
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

// Delete single product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`${api}/api/products/${id}`,   { withCredentials: true });
    dispatch(removeProduct(id));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

// Update product
export const editProduct = (data) => async (dispatch) => {
  try {
    
    const response = await axiosInstance.put(`${api}/api/products/${data.id}`, data.formData, { withCredentials: true });
    dispatch(updateProduct(response.data.product));
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

// Delete many products
export const deleteManyProducts = (ids) => async (dispatch) => {
  try {
    await axiosInstance.post(`${api}/api/products/delete-many`, { productIds: ids }, { withCredentials: true });
    dispatch(deleteProductsFromState(ids));
  } catch (error) {
    console.error('Error deleting products:', error);
  }
};

export default productsSlice.reducer;
