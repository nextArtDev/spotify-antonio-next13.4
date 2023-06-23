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
