const { connection } = require("../config/config.db");
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.login = (req, res) =>{
    const{username, password} = req.body;
    const consult = 'SELECT * FROM usuarios WHERE Usuario_Username = ?';
    try{
        connection.query(consult, [username, password], (err, result) =>{
            if(err){
                res.send(err);
            }
            if(result.length > 0){
                const token = jwt.sign({username},"Stack",{
                    expiresIn: '3m'
                });
                res.send({token});
            }
            else{
                console.log('Usuario no encontrado o inexistente.')
                res.send({message:'Usuario no encontrado o inexistente.'})
            }
        })
    }catch(e){

    }
};