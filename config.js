

const config = {
    host: process.env.HOST || '127.0.0.1',
    node: process.env.NODE_ENV || 'mongodb://localhost:27017/desafioSesion'
}

module.exports = config