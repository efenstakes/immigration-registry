const jwt = require('jsonwebtoken')


// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
export const authenticate = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      req.is_authenticated = false
      req.user = null
      // console.log('no authorization')
      next()
      return
    }
    

    const idToken = req.headers.authorization.split(' ')[1];
    try {
      const payload = jwt.verify(idToken, process.env.ACCESS_TOKEN_SECRET)
      console.debug('payload ', payload)

      if( !payload ) {
        req.user = null
        next()
        return
      }

      const { password, ...user } = payload
      req.user = user
            
      next()
      return
    } catch(e) {
      req.user = null
      next()
      return
    }
};





export const generateAccessToken = (account) => {
  return jwt.sign(
    { ...account }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '.5y', subject: account._id.toString() }
  )
}

export const generateRefreshToken = (account) => {
  return jwt.sign(
    { ...account }, 
    process.env.REFRESH_TOKEN_SECRET, 
    { expiresIn: '1y', subject: account._id.toString() }
  )
}


export const verifyAccessToken = (token)=> {
  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  return payload
}

export const verifyRefreshToken = (token)=> {
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  return payload
}
