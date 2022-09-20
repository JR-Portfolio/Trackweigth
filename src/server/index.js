const express = require('express')
var cors = require("cors");
const ernoRoutes = require('../routes/ernoRoutes')

const PORT = process.env.PORT || 3001;

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/test', (req, res) => {
    res.json({message: 'Terve Erno'})
})

app.use(ernoRoutes)

app.listen(PORT, () => {
    console.log('Erno server is listening port, ' + PORT)
})
