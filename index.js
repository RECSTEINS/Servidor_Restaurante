require('dotenv').config();
const express = require("express");
const app     = express();
const { Server} = require('socket.io');
const {createServer} = require('http');
const cors   = require("cors");
const routes = require('./routes/endPoints.js');
const { timeStamp } = require('console');
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
};

const io = new Server(httpServer, {
    cors: corsOptions
});

io.on('connection', (socket) =>{
    console.log(socket.id)

    socket.on('message', (data) =>{ // Recibe el objeto con el mensaje y el nombre del remitente
        console.log(data)
        socket.broadcast.emit('message',{
            body: data.body,
            from: data.senderName, // Utiliza el nombre del remitente en lugar del socket.id
            timestamp: new Date()
        })
    })
})

app.use(cors(corsOptions));


app.use('/',routes);


const PORT = process.env.PORT;
httpServer.listen(PORT,()=>{
    console.log("El servidor esta en el puerto " + PORT);
});
module.exports = app;