const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
    try { /* req - body, params, query, header */
        const token = req.header('auth')?.replace('Bearer ', '')

        if(!token){
            res.status(400).json({msg: 'Token Incorrecto'})
        }

        const verify = jwt.verify(token, process.env.SECRET_KEY)
        
        if(verify){
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = auth 