const express = require('express')
const router = require('./routers/router')
const {root} = require('./controllers/rootController')

const { //ERROR HANDLING
    badPath,
    psqlError,
    customError,
    unhandledErrors
} = require('./errors')


const app = express()

app.use(express.json())

//ROUTER
app.use('/api', router)

//DEFAULTS
app.get('/', root)


//ERROR HANDLING
app.all('*', badPath)

app.use(customError)

app.use(psqlError)

app.use(unhandledErrors)

module.exports = app