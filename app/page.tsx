'use client'

import { useAppSelector } from '@/redux/store'

import { toggleTheme } from '@/redux/slices/themeSlice'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useAppSelector((state) => state.themeReducer.theme)
  return (
    <button onClick={() => dispatch(toggleTheme())} className="text-green-500 ">
      {theme}
    </button>
  )
}
