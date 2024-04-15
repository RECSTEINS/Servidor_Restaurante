const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");
const { request, response } = require("..");

const getEmpleados= (request, response) => {
    connection.query("SELECT * FROM usuarios",
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const getEmpleadoId= (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM usuarios WHERE Usuario_Id = ?",
    [id],
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const updateEmpleado = (request, response) => {
    const id = request.params.id;
    const { nombre, username, correo, puesto, password } = request.body;

    connection.query(
        "UPDATE usuarios SET Usuario_Nombre = ?, Usuario_Username = ?, Usuario_Correo = ?, Usuario_Puesto = ?, Usuario_Password = ? WHERE Usuario_Id = ?",
        [nombre, username, correo, puesto, password, id],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar el empleado:", error);
                response.status(500).json({ error: "Error interno del servidor" });
            } else {
                if (results.affectedRows > 0) {
                    response.status(200).json({ message: "Empleado actualizado correctamente" });
                } else {
                    response.status(404).json({ error: "Empleado no encontrado" });
                }
            }
        }
    );
}

const postEmpleado = (request, response) => {
    const { id, nombre, username, correo, puesto, password, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO usuarios (Usuario_Nombre, Usuario_Username, Usuario_Correo, Usuario_Puesto, Usuario_Password) VALUES (?, ?, ?, ?, ?)",
            [nombre, username, correo, puesto, password],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Usuario añadida correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE Usuarios SET Usuario_Nombre = ?, Usuario_Username = ?, Usuario_Correo = ?, Usuario_Puesto = ?, Usuario_Password = ? WHERE Usuario_Id = ?",
            [nombre, username, correo, puesto, password, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Usuario actualizado correctamente": results.affectedRows });
            }
        );
    }
};

const delEmpleado = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM usuarios WHERE Usuario_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Usuario eliminado":results.affectedRows});
    });
};

module.exports = { getEmpleadoId, delEmpleado, postEmpleado, getEmpleados, updateEmpleado};