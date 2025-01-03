// store/categoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    removeCategory(state, action) {
      state.categories = state.categories.filter((category) => category._id !== action.payload);
    },
    updateCategory(state, action) {
      const index = state.categories.findIndex((category) => category._id === action.payload._id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategoriesFromState(state, action) {
      state.categories = state.categories.filter(
        (category) => !action.payload.includes(category._id)
      );
    },
  },
});

// Actions
export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  addCategory,
  removeCategory,
  updateCategory,
  deleteCategoriesFromState,
} = categoriesSlice.actions;

// Async Thunks

// Fetch categories from API

const api = process.env.NEXT_PUBLIC_API_URL;
export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const response = await axios.get(`${api}/api/categories`);
    dispatch(fetchCategoriesSuccess(response.data));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

// Add new category
export const createCategory = (category) => async (dispatch) => {
  try {
    const response = await axios.post(`${api}/api/categories`, category, {
      withCredentials: true,
    });
    dispatch(addCategory(response.data.category));
  } catch (error) {
    console.error('Error adding category:', error);
  }
};

// Delete single category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    await axios.delete(`${api}/api/categories/${id}`, { withCredentials: true });
    dispatch(removeCategory(id));
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};

// Update category
export const editCategory = (data) => async (dispatch) => {
  try {
    // console.log("id:",data.id)
    const response = await axios.put(`${api}/api/categories/${data.id}`, data.formData, {
      withCredentials: true,
    });
    
    dispatch(updateCategory(response.data.category));
  } catch (error) {
    console.error('Error updating category:', error);
  }
};

// Delete many categories
export const deleteManyCategories = (ids) => async (dispatch) => {
  try {
    // console.log("ids:", ids)
    await axios.post(`${api}/api/categories/delete-many`, {categoryIds: ids }, { withCredentials: true });
    dispatch(deleteCategoriesFromState(ids));
  } catch (error) {
    console.error('Error deleting categories', error);
  }
};

export default categoriesSlice.reducer;
