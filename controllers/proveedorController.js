const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

//Read
const getProveedores= (request, response) => {
    connection.query("SELECT * FROM proveedores",(error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};
const getProveedorId= (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM proveedores WHERE Proveedor_Id = ?",
    [id],
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const updateProveedor = (request, response) => {
    const id = request.params.id;
    const { nombre, activo } = request.body;

    connection.query(
        "UPDATE proveedor SET Proveedor_Nombre = ?,  Proveedor_Activo = ? WHERE Proveedor_Id = ?",
        [nombre, activo, id],
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
const postProveedores = (request, response) => {
    const { id, nombre, activo, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO proveedores (Proveedor_Nombre, Proveedor_Activo) VALUES (?, ?)",
            [nombre, activo],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Proveedor añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE proveedores SET Proveedor_Nombre = ?, Proveedor_Activo = ?  WHERE Proveedor_Id = ?",
            [nombre, activo, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({"Proveedor actualizado correctamente": results.affectedRows });
            }
        );
    }
};

//Delete
const delProveedores = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM proveedores WHERE Proveedor_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Proveedor eliminado":results.affectedRows});
    });
};

module.exports = {getProveedores, postProveedores, delProveedores, getProveedorId, updateProveedor};