import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  slides: [],
  isLoading: false,
  error: null,
};

const slidesSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {
    fetchSlidesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchSlidesSuccess(state, action) {
      state.isLoading = false;
      state.slides = action.payload;
    },
    fetchSlidesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addSlide(state, action) {
      state.slides.push(action.payload);
    },
    removeSlide(state, action) {
      state.slides = state.slides.filter((slide) => slide._id !== action.payload);
    },
    updateSlide(state, action) {
      const index = state.slides.findIndex((slide) => slide._id === action.payload._id);
      if (index !== -1) {
        state.slides[index] = action.payload;
      }
    },
    deleteSlidesFromState(state, action) {
      state.slides = state.slides.filter(
        (slide) => !action.payload.includes(slide.id)
      );
    },
  },
});

export const {
  fetchSlidesStart,
  fetchSlidesSuccess,
  fetchSlidesFailure,
  addSlide,
  removeSlide,
  updateSlide,
  deleteSlidesFromState,
} = slidesSlice.actions;

// Async Thunks

// Fetch slides from API
const api = process.env.NEXT_PUBLIC_API_URL;
export const fetchSlides = () => async (dispatch) => {
  dispatch(fetchSlidesStart());
  try {
    const response = await axios.get(`${api}/api/slides`);
    dispatch(fetchSlidesSuccess(response.data));
  } catch (error) {
    dispatch(fetchSlidesFailure(error.message));
  }
};

// Add new slide
export const createSlide = (slide) => async (dispatch) => {
  try {
    const response = await axios.post(`${api}/api/slides`, slide , { withCredentials: true });
    dispatch(addSlide(response.data.slide));
  } catch (error) {
    console.error('Error adding slide:', error);
  }
};

// Delete single slide
export const deleteSlide = (id) => async (dispatch) => {
  try {
    await axios.delete(`${api}/api/slides/${id}`, { withCredentials: true });
    dispatch(removeSlide(id));
  } catch (error) {
    console.error('Error deleting slide:', error);
  }
};

// Update slide
export const editSlide = (data) => async (dispatch) => {
  try {
    const response = await axios.put(`${api}/api/slides/${data.id}`, data.formData, { withCredentials: true });
    dispatch(updateSlide(response.data.slide));
  } catch (error) {
    console.error('Error updating slide:', error);
  }
};

// Delete many slides
export const deleteManySlides = (ids) => async (dispatch) => {
  try {
    await axios.post(`${api}/api/slides/delete-many`, { slideIds: ids } , { withCredentials: true });
    dispatch(deleteSlidesFromState(ids));
  } catch (error) {
    console.error('Error deleting slides', error);
  }
};

export default slidesSlice.reducer;
