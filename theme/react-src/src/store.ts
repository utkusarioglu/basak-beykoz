import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {
  },
});

export default store;
export const { dispatch, subscribe, getState } = store;
export type RootState = ReturnType<typeof store.getState>;
