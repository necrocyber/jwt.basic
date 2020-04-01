import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import config from '../config/config'
import user from '../models/user'

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.tokensecret
}

export default new Strategy(opts, async (payload, done) => {
    try {
        const userExists = await user.findById(payload.id)
        if(userExists) {
            return done(null, userExists)
        }

        return done(null, false)
    } catch (error) {
        console.log(error)
    }
    
})