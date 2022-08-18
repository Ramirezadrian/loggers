const express = require('express')
const {Server: HttpServer} =require('http')
const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const socket = new IOServer(httpServer)

const random = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1)) + min)
}


const getNumbers = (cant) =>{
    const numeros = []
    for(let i =0; i < cant; i++){
        numeros.push(random(1,1000))
    }
    return numeros
}


socket.on('cantidad', cant => {
    
    //const nums = getNumbers(cant)

    socket.emit('message', cant) 
    
})