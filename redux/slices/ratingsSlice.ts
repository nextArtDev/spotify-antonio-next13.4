import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Rating } from '@prisma/client'

interface RatingsState {
  ratings: Rating[]
}

const initialState: RatingsState = {
  ratings: [],
}

export const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    addRating: (state, action: PayloadAction<Rating>) => {
      state.ratings.push(action.payload)
    },
  },
})

export const { addRating } = ratingsSlice.actions

export default ratingsSlice.reducer
