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
