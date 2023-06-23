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
          خروج
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
      ورود
    </button>
  )
}

export default SigninButton
