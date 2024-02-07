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
        }else{
            res.status(401).json({msg: 'No autorizado'})
        }

    } catch (error) {
        res.status(500).json({msg: 'Falla en el servidor', error: error})
    }
}

module.exports = auth 