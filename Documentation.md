## proper way to pass Server component inside a client component
We pass all of our children of _layout_ to sidebar and mark our sidebar to client component by _use client_ *and it douse not mean that everything inside in our sidebar(layout childs become a client component)* because we pass them ass **_children_**

## Tailwind Merge
$npm i tailwind-merge
exactly like cn or clasnames
---
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
  ___

# Next Auth
we should install it:
$npm i next-auth

then create nextauth route, a dynamic next handler for the next auth, it catches all routes for it, which means every api routes which starts with **/api/auth/*** (like _/api/auth/signin_ and _/api/auth/signout_) would be handled by this route:
_app/api/auth/[...nextauth]_

## installing prisma:
$npm install prisma --save-dev

for monogodb
$npx prisma init --datasource-provider mongodb 

or for sql:
$npx prisma init --datasource-provider sqlite

after setting up user model in prisma:
for not mongo db
$ npm prisma migrate --dev name init  

for mongo db (and allow access):
$npm prisma db push

and then for prisma client:
$npm i @prisma/client

and for last thing we create _lib/prisma.ts_ and past code (the best practice in doc for next.js 13 ):

```typescript
import { PrismaClient } from "@prisma/client";
//every time we need to use prisma client we need to instantiate a new instant of prisma client class, in order to have just one instance of the prisma client class, we just import last _prisma_ from this class 
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
//now we just import it instead of every time creating  _new PrismaClient_ class 
export default prisma;
```

then we can use the prisma model anywhere! and see
$npx prisma studio

```js
// e.g. in `pages/index.tsx`
import { prisma } from './db'

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany()

  return { props: { posts } }
}

```
```jacascript
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
// defining our api handler
const handler = NextAuth({
  //here, and first we want a list of providers. Provider is a specific way of authentication, CredentialsProvider is the one that the user should have 'username' and 'password' in order to sign up and sign in
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        //since the next-auth can create a default sign-in page, it uses label, type and placeholder attribute
        username: {
          label: 'نام کاربری',
          type: 'text',
          placeholder: 'نام کاربری',
        },
        password: { label: 'پسورد', type: 'password' },
      },
      //most important part of the credentials provider; it would be called when user fill the sig nin form
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied.
        // we send a post request to backend api to check if the credentials is correct returns a user object, else through an error or (here) return null
        // here we use prisma for db and also then we create a login api which takes username and password and checks inside db if supplied credentials is correct and such a user exist and then returns basic information as a user object
        //After creating login api route to find and co,pare password of user we post data to it:
        const res = await fetch('http://localhost:3000/api/login', {
          //we make this request by post
          method: 'POST',
          //then we set headers
          headers: {
            'Content-Type': 'application/json',
          },
          //we send username and password from this credential object and api route does it works i.e. get them by request.json(), and try to find it by email: await prisma.user.findFirst({}) and if it exists compared hashed password
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        })
        //api login route returns back  'new Response(JSON.stringify(result))' or "new Response(JSON.stringify(null))" if its ok, we return user, else null
        const user = await res.json()

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          // if its ok and user exists and matched with password, returned user null to the "session" of next-auth
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
})
//by this line we can have next-auth api handler inside the app directory, every get or post request to this api routes would be handle by the naxt-auth
export { handler as GET, handler as POST }
```

## creating our login api
create _app/api/login/route.ts_ to appply it to nextauth api routes

```javascript
import { signJwtAccessToken } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import * as bcrypt from 'bcrypt'

interface RequestBody {
  username: string
  password: string
}

//this post request is our login api
export async function POST(request: Request) {
  // we expect the username & password here
  const body: RequestBody = await request.json()

  //now with the help of prisma client we can find a user with this username & password
  //here instead of create new instance of PrismaClient Class, we import it from our lib/prisma.ts
  // that in that we access to 'user'
  const user = await prisma.user.findFirst({
    where: {
      //we use email as username so we gonna find first user that its email is match to the username which is supplied to the login api
      email: body.username,
    },
  })
  // check if the user is not null and password matched
  // we should install bcrypt and type of it (npm i --save-dev @types/bcrypt)
  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user
    const accessToken = signJwtAccessToken(userWithoutPass)
    const result = {
      ...userWithoutPass,
      accessToken,
    }
    //stringifying (This method is commonly used when sending data between a client and server, as JSON is a lightweight data format that can be easily parsed by both JavaScript and other programming languages. it converts a JavaScript object or value into a JSON string.) user with that password:  name: "John" --> "name":"John"
    return new Response(JSON.stringify(result))
  } else return new Response(JSON.stringify(null))
}
```

## creating user by another route 
we create 'app/api/user/route.ts'

```javascript
import prisma from '@/lib/prisma'
import * as bcrypt from 'bcrypt'

interface RequestBody {
  name: string
  email: string
  password: string
}

export async function POST(request: Request) {
  //its to creating a new user and inside the body of this post request we expect the name, email and password(which should be hashed)
  const body: RequestBody = await request.json()

  // creating user inside prisma client
  const user = await prisma.user.create({
    //in prisma, like axios we should specify 'data'
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  })
  //returning the created user into the client without password
  const { password, ...result } = user
  //we first create e new user inside the database and then return it as a response(without password to the client)
  return new Response(JSON.stringify(result))
}
```

## next-auth session
next auth session is a place for keeping current authenticated user data. we can check 'if(session.user !== null) User is Authenticated' and if the user is null it means its not authenticated
for that we have to wrap whole the root level of our app with authentication provider, we create a component to wrap our app, because it have to be client component:
_components/AuthProvider.tsx_
```typescript
'use client'

import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
``` 
then we go to the root layout of our app and wrap it by AuthProvider

```typescript
'use client'

import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider

```

and then wrap our _layout_ with that.

## creating signin and signup buttons

we create sign in button in: _components/SigninButton.tsx_

```typescript
'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const SigninButton = () => {
  //we access to the session of the next auth, its 'data' but we rename it to 'session'
  const { data: session } = useSession()
  console.log(session?.user)

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        {/* signOut is come from next-auth */}
        <button onClick={() => signOut()} className="text-red-600 ">
          Sign Out
        </button>
      </div>
    )
  }
  {
    /* signIn is come from next-auth, 
    Important: it would redirect us to the sign in form created by next-auth, that we can create it Our selves too! we should create:costume sign in page!
    */
  }
  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
      Sign In
    </button>
  )
}

export default SigninButton

```
## JWT 
the session of the next-auth can be kept in 2 ways, we can we can keep it in _DataBase_ or keep it in jwt and kept in http-only-cookie (the default). it should be session:{strategy:{}} we can add maxAge too, the default one is 30days.
But if we want to have this strategy, **we have to have NEXTAUTH_SECRET in our .env file** and also in order to next auth work correctly in production we should add NEXTAUTH_URL 
### NEXTAUTH_SECRET 
its neccessary for jwt default strategy, and it should be a complex string

### NEXTAUTH_URL
In order to next-auth work correctly in production env we should have it in .env file

# Protect pages with next-auth middleware
first export { default } from 'next-auth/middleware'
then, include every page you want!
export const config = { matcher: ['/userpage/:path*'] }

we create a page: _UserPost/page.tsx_ and we want to protect it:
inside src and side by side of _app_ we create _middleware.ts_

```javascript
export { default } from 'next-auth/middleware'
//it protects _userpage_ page and other inner routes
export const config = { matcher: ['/userpage/:path*'] }

```

# Protecting _dynamic routes_
In order to do that we should require the client to have an access token inside the header of its request to this api, but we should create an access token in login api and return that access token to the user to user lig in in our app and if user wants to access to that route he/she should include that token in its request

1. step1: create a JWT access token in login api:
2. step 2: save the Access token inside the next-auth session
3. step 3: require the client to have access token in the header of its request

step 1: first we should use library to create token:
$npm i jsonwebtoken 
and for ts:
$npm i --save-dev @types/jsonwebtoken

now we need to functions; first to create and sign jwt token second for verifying that
  _lib/jwt.ts_
  ```typescript
import jwt, { JwtPayload } from 'jsonwebtoken'

interface SignOption {
  expiresIn?: string | number
}
// we dont need to pass it every time we want
const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: '1h',
}

export function signJwtAccessToken(
  //its type is from jsonwebtoken itself
  payload: JwtPayload,
  // its expires time
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY
  const token = jwt.sign(payload, secret_key!, options)
  return token
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY
    const decoded = jwt.verify(token, secret_key!)
    return decoded as JwtPayload
  } catch (error) {
    console.log(error)
    return null
  }
}

  ```

if the login process was succesful we can crete a access token and return it along with the user object

_app/api/logi/route.ts_
```typescript
 if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user
    //create access token by lib jwt fn and pass user to it
    const accessToken = signJwtAccessToken(userWithoutPass)
    const result = {
      ...userWithoutPass,
      //store access token in result
      accessToken,
    }
    //stringifying (This method is commonly used when sending data between a client and server, as JSON is a lightweight data format that can be easily parsed by both JavaScript and other programming languages. it converts a JavaScript object or value into a JSON string.) user with that password:  name: "John" --> "name":"John"

    //return user wih access token and other properties
    return new Response(JSON.stringify(result))
  } else return new Response(JSON.stringify(null))
```

step 2: we should store that access token in next-auth session
first we should create types because we dont have access to id and jwt inside session right now : create: lib/types/next-auth.d.ts

```typescript
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      accessToken: string;
    };
  }
}

```
now autocomplete have id and access token but its not inside session if we log session, in order to fix this inside _auth/[...nextauth]/routes.ts_ we should add callback object after array of providers

```typescript
  //we can have 'session:' and 'pages' (for signIn, signOut and other pages).
  //these are fns to add access token to user session
  callbacks: {
    //first we combine token and user into one object and return from jwt
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    // second we populate user with session and token w
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
```

step 3: require the client to have access token in the header of its request
we want to protect dynamic route _user/[id]/route.ts_ which is posts of user:

```typescript
import { verifyJwt } from '@/lib/jwt'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  //first we check if the access token is inside the header of request
  const accessToken = request.headers.get('authorization')
  //if access token is not at the header of the request or its not valid:
  //we define verifyjwt fn ourselves
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: 'unauthorized',
      }),
      {
        status: 401,
      }
    )
  }
  const userPosts = await prisma.post.findMany({
    where: { userId: '' + params.id },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  })

  return new Response(JSON.stringify(userPosts))
}
```