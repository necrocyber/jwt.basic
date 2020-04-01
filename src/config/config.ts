export default {
    tokensecret : process.env.TOKEN_SECRET || 'sometokensecret',
    DB : {
        URL : process.env.MONGODB_URL || 'mongodb://localhost/session',
        USER: process.env.USER_DB,
        PASSWROD: process.env.PASS_DB
    }
}