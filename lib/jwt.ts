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
  //we read secret key from .env, so it can be undefined or string but we ensure its string
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
