const express=require('express')
const path = require('path')
const app = express()
const publicPath =  path.resolve('public')
const APP_PORT = 3000

app.use(express.static(publicPath)) //le decimos que queremos la carpeta como un recurso de archivos estáticos

app.listen(APP_PORT,() => console.log("Servidor corriendo en puerto " + APP_PORT))

app.get('/',(req,res) =>res.sendFile(path.resolve('./views/layout.html')))
app.get('/product-detail',(req,res) =>res.sendFile(path.resolve('./views/productDetail.html')))
app.get('/product-cart',(req,res) =>res.sendFile(path.resolve('./views/prductCart.html')))
app.get('/register',(req,res) =>res.sendFile(path.resolve('./views/register.html')))
app.get('/login',(req,res) =>res.sendFile(path.resolve('./views/login.html')))
app.get('/header-y-footer',(req,res) =>res.sendFile(path.resolve('./views/header-y-footer.html')))