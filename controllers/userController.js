const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    registerUser: async (req, res) =>{
        try {
            const {username, email, password} = req.body;
            const user = await Users.findOne({email: email})
            if(user) return res.status(400).send(`E-mail already exists!!`)

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash
            })
            await newUser.save()
            res.send(`Thanks for joining with us..`)
        } catch (err) {
            return res.status(500).send(`Error :`,err)
        }
    },
    loginUser: async (req, res) =>{
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({email: email})
            if(!user) return res.status(400).send("Username Invalid!!")

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).send("Incorrect Credentials!!")

            const payload = {id: user._id, name: user.username}
            const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1d"})

            res.json({token})
        } catch (err) {
            return res.status(500).send(`Error :`,err)
        }
    },
    verifiedToken: (req, res) =>{
        try {
            const token = req.header("Authorization")
            if(!token) return res.send(false)

            jwt.verify(token, process.env.SECRET_KEY, async (err, verified) =>{
                if(err) return res.send(false)

                const user = await Users.findById(verified.id)
                if(!user) return res.send(false)

                return res.send(true)
            })
        } catch (err) {
            return res.status(500).send(`Error :`,err)
        }
    } 
}


module.exports = userCtrl