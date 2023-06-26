import { configureStore } from '@reduxjs/toolkit'
import { themeReducer } from './slices/themeSlice'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import ratingsReducer from './slices/ratingsSlice'
export const store = configureStore({
  reducer: {
    themeReducer,
    ratings: ratingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
