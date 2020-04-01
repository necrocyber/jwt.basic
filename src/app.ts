import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRoute from './routes/auth.route'
import specialRoute  from './routes/special.route'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'

// Initialization
const app = express()

// Middlewares
app.set('port', process.env.PORT || 3000)

// Settings
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddleware)

// Routes
app.get('/', (req, res) => {
    res.send(`My API run in http://localhost:${app.get('port')}`)
});

app.use(authRoute)
app.use(specialRoute)

export default app