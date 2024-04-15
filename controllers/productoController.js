const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

//Read
const getProductos= (request, response) => {
    connection.query("SELECT * FROM productos",(error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const getProductoId= (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM productos WHERE Productos_Id = ?",
    [id],
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const updateProducto = (request, response) => {
    const id = request.params.id;
    const { nombre, descripcion, tipo, precio, idProveedor } = request.body;

    connection.query(
        "UPDATE productos SET Productos_Nombre = ?, Productos_Descripcion = ?, Productos_Tipo = ?, Productos_Precio = ?, Productos_ProveedorID = ? WHERE Productos_Id = ?",
        [nombre, descripcion, tipo, precio, idProveedor, id],
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
const postProducto = (request, response) => {
    const { id, nombre, descripcion, tipo, precio, idProveedor, action } = request.body;
    if (action === "insert") {
        connection.query(
            "INSERT INTO productos (Productos_Nombre, Productos_Descripcion, Productos_Tipo, Productos_Precio, Productos_ProveedorID) VALUES (?, ?, ?, ?, ?)",
            [nombre, descripcion, tipo, precio, idProveedor],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Producto añadido correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE productos SET Productos_Nombre = ?, Productos_Descripcion = ?, Productos_Tipo = ?, Productos_Precio = ?, Productos_ProveedorID = ? WHERE Productos_Id = ?",
            [nombre, descripcion, tipo, precio, idProveedor, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Producto actualizado correctamente": results.affectedRows });
            }
        );
    }
};

//Delete
const delProductos = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM productos WHERE Productos_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Producto eliminado":results.affectedRows});
    });
};

module.exports = {getProductos, postProducto, delProductos, getProductoId, updateProducto};