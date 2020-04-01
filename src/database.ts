import mongoose , { ConnectionOptions } from 'mongoose'
import config from './config/config'

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(config.DB.URL, dbOptions)

const connection = mongoose.connection

connection.once('open', () => {
    console.log('Mongodb connection')
})


connection.on('error', err => {
    console.log('Mongodb connection error')
    process.exit(0)
})