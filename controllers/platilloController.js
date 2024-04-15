const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

//Read
const getPlatillos= (request, response) => {
    connection.query("SELECT * FROM platillos",(error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const getPlatilloId= (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM platillos WHERE Platillos_Id = ?",
    [id],
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const updatePlatillo = (request, response) => {
    const id = request.params.id;
    const { nombre, tipo, descripcion, precio} = request.body;

    connection.query(
        "UPDATE platillos SET Platillos_Nombre = ?, Platillos_Tipo = ?, Platillos_Descripcion = ?, Platillos_Precio = ?  WHERE Platillos_Id = ?",
        [nombre, tipo, descripcion, precio, id],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar el registro:", error);
                response.status(500).json({ error: "Error interno del servidor" });
            } else {
                if (results.affectedRows > 0) {
                    response.status(200).json({ message: "Registro actualizado correctamente" });
                } else {
                    response.status(404).json({ error: "Registro no encontrado" });
                }
            }
        }
    );
}

//Create, Update
const postPlatillos = (request, response) => {
    const { id, nombre, tipo, descripcion, precio, action } = request.body;
    if (action === "insert") {
        connection.query(
            "INSERT INTO platillos (Platillos_Nombre, Platillos_Tipo, Platillos_Descripcion, Platillos_Precio) VALUES (?, ?, ?, ?)",
            [nombre, tipo, descripcion, precio],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Platillo añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE platillos SET Platillos_Nombre = ?, Platillos_Tipo = ?, Platillos_Descripcion = ?, Platillos_Precio = ?  WHERE Platillos_Id = ?",
            [nombre, tipo, descripcion, precio, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Platillo actualizado correctamente": results.affectedRows });
            }
        );
    }
};

//Delete
const delPlatillos = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM platillos WHERE Platillos_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Platillo eliminado":results.affectedRows});
    });
};

module.exports = {getPlatillos, postPlatillos, delPlatillos, getPlatilloId, updatePlatillo};