## proper way to pass Server component inside a client component
We pass all of our children of _layout_ to sidebar and mark our sidebar to client component by _use client_ *and it douse not mean that everything inside in our sidebar(layout childs become a client component)* because we pass them ass **_children_**

## Tailwind Merge
$npm i tailwind-merge
exactly like cn or clasnames

## How to Pass icons (react-icons) in TS

first import IconType from icons-react
then antialias(?) it to capital Icon to use it as a component
 
```typescript
import {iconTypes} from react-icons

interface Sidebar{
    ...
    icon: IconTypes
}
const SidebarItem: FC<SidebarItemProps> = ({ icon:Icon}) => {
  return (
    <Link
      href={href}
      className={twMerge(` text-neutral-400 py-1`, active && 'text-white'
      )}
    >
        <Icon  />
      آیتم ها{' '}
    </Link>
  )
``

# Redux-Toolkit nextjs

1. first define slice: 
redux/ slice/ themeSlice.ts
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type InitialState = {
  theme: string
}
const initialState: InitialState = { theme: 'light' }
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      console.log(state.theme)
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer
```

2. define store 
``` typescript
import { configureStore } from '@reduxjs/toolkit'
import { themeReducer } from './slices/themeSlice'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
export const store = configureStore({
  reducer: {
    themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

```

3. define provider
  redux/ providers.tsx
  ```Typescript
  'use client'
import { Provider } from 'react-redux'
import { store } from './store'

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

  ```

  4. wrap the app
  layout.tsx

  ```typescript
  <Providers>{children}</Providers>
  ```

  5. use iT!
  ```typescript
  'use client'

import { useAppSelector } from '@/redux/store'

 import { toggleTheme } from '@/redux/slices/themeSlice'
import { AppDispatch } from '@/redux/store'
 import { useDispatch } from 'react-redux'

export default function Home() {
   const dispatch = useDispatch<AppDispatch>()
  const theme = useAppSelector((state) => state.themeReducer.theme)
  return <div className="text-green-500 " onClick={()=>dispatch(toggleTheme)} >{theme}</div>
}

  ```