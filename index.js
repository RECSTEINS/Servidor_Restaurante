require('dotenv').config();
const express = require("express");
const app     = express();
const cors    = require("cors");
const routes = require('./routes/endPoints.js')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: 'http://localhost:3000', // Permitir solicitudes solo desde este origen
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));


app.use('/',routes);


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("El servidor esta en el puerto " + PORT);
});
module.exports = app;