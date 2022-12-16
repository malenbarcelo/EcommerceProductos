const express = require('express')
const path = require('path')
const app = express()
const mainRoutes = require('./src/routes/mainRoutes.js')
const productsRoutes = require('./src/routes/productsRoutes.js')
const usersRoutes = require('./src/routes/usersRoutes.js')
const publicPath =  path.resolve('./public')
const srcPath = path.resolve('./src')
const session = require('express-session') 
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware')
const cookies = require('cookie-parser')

const APP_PORT = 3000
const methodOverride = require('method-override')

app.use(express.static(publicPath)) //le decimos que queremos la carpeta como un recurso de archivos estáticos
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}))

app.use(cookies())
app.use(userLoggedMiddleware)

app.set('views', path.join(__dirname, 'src/views')); //este paso es porque la carpeta views no está en la carpeta raiz
app.set('view engine','ejs')
app.use(methodOverride('_method'))

app.listen(APP_PORT,() => console.log("Servidor corriendo en puerto " + APP_PORT))

app.use('/',mainRoutes)
app.use('/products',productsRoutes)
app.use('/users',usersRoutes)
