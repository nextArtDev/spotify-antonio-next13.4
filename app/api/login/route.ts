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
}
