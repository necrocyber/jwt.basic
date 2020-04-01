import { Request, Response } from 'express'
import user, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config/config'

function createToken(user: IUser) {
    return jwt.sign({id: user.id, email: user.email}, config.tokensecret, {
        expiresIn: 3600
    })
}

export const signup = async (req: Request, res: Response) => {
    
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: "Please, send you email and password" })
    }

    const User = await user.findOne({ email: req.body.email })
    if(User) {
        return res.status(400).json({ msg: 'The user already exists' })
    }

    const newUser = new user(req.body)
    await newUser.save()

    return res.status(200).json(newUser)
}

export const signin = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: "Please, send you email and password" })
    }

    const User = await user.findOne({ email: req.body.email })
    if(!User) {
        return res.status(400).json({ msg: 'The user does not exists' })
    }

    const isMatch = await User.comparePassword(req.body.password)
    if(isMatch) {
        return res.status(200).json({ token: createToken(User) })
    }

    return res.status(400).json({
        msg : "The email or password are incorrect"
    })

}