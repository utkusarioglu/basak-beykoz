import { configureStore } from '@reduxjs/toolkit';
import app from './slices/app/app.slice';
import singularRepo from './slices/singular-repo/singularRepo.slice';
import singular from './slices/singular/singular.slice';
import categoryPosts from './slices/category-posts/categoryPosts.slice';

const store = configureStore({
  reducer: {
    app,
    singularRepo,
    singular,
    categoryPosts,
  },
});

export default store;
export const { dispatch, subscribe, getState } = store;
export type RootState = ReturnType<typeof store.getState>;
