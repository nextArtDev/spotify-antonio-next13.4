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
