const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).send(`Invalid Authentication`)

        jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
            if(err) return res.status(400).send(`Authorization not valid`)

            req.user = user;
            next()
        })
    } catch (err) {
        return res.status(500).send(`Error :`,err)
    }
}

module.exports = auth