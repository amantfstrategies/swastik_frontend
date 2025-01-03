import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper'; // Import next-redux-wrapper
import componentReducer from './componentSlice';
import userReducer from './userSlice';
import productsReducer from './productsSlice';
import categoriesReducer from './categoriesSlice';
import slidesReducer from './slidesSlice';

const store = configureStore({
  reducer: {
    components: componentReducer,
    user: userReducer,
    products: productsReducer,
    categories: categoriesReducer,
    slides: slidesReducer,
  },
});

// Create the wrapper using the store
const makeStore = () => store;

export const wrapper = createWrapper(makeStore); // Export the wrapper

export default store;
