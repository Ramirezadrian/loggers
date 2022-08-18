const { fork } = require('child_process')
const express = require('express')
const {Server: HttpServer} =require('http')
const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
let visitas = 0




app.get('/visitas', (req, res) =>{
    return res.end(`Visitas: ${visitas++}`)
})
  
app.get('/api/randoms', (req, res) =>{
let cant = Number(req.query.cant)

if(isNaN(cant)){
    cant = 100000
    
    console.log(cant)
    const numRandoms = fork('./public/random.js')
    numRandoms.on('mesagge', numeros =>{
    return res.end(`Me tiro estop: ${numeros}`)
    })
} 
else {
    console.log(cant)
    io.emit('cantidad',cant)
    const numRandoms = fork('./public/random.js')
    numRandoms.on('mesagge', numeros =>{
    return res.end(`Me tiro estop: ${numeros}`)
    })
} 
})   

  const PORT = 8080

 const server = httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor: ${error}`))

