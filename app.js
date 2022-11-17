const express=require('express')
const path = require('path')
const app = express()
const mainRoutes = require('./routes/mainRoutes.js')
const productsRoutes = require('./routes/productsRoutes.js')
const usersRoutes = require('./routes/usersRoutes.js')
const publicPath =  path.resolve('./public')
const APP_PORT = 3000

app.use(express.static(publicPath)) //le decimos que queremos la carpeta como un recurso de archivos estáticos
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine','ejs')

app.listen(APP_PORT,() => console.log("Servidor corriendo en puerto " + APP_PORT))

app.use('/',mainRoutes)
app.use('/products',productsRoutes)
app.use('/',usersRoutes)
