import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { addRating } from '../redux/slices/ratingsSlice'
import { Rating } from '@prisma/client'

const HomePage = () => {
  const [rating, setRating] = useState<number>(0)
  const dispatch = useDispatch()
  const ratings = useSelector((state: RootState) => state.ratings)

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  const handleAddRating = () => {
    const newRating: Rating = {
      value: rating,
      createdAt: new Date(),
    }
    dispatch(addRating(newRating))
    setRating(0)
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-8">Star Rating System</h1>
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`w-12 h-12 rounded-full ${
                rating >= value ? 'bg-yellow-500' : 'bg-gray-300'
              }`}
              onClick={() => handleRatingChange(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleAddRating}
        >
          Add Rating
        </button>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Ratings:</h2>
          {ratings.map((r) => (
            <div key={r.id} className="flex items-center space-x-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                {r.value}
              </div>
              <span>{r.createdAt.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePage
