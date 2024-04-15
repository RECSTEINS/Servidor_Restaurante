const express=require("express")
const app=express();
const dotenv= require ("dotenv");
dotenv.config();

const {connection}= require ("../config/config.db");

//Read
const getReservaciones= (request, response) => {
    connection.query("SELECT * FROM reservaciones",(error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const getReservaId= (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM reservaciones WHERE Reservaciones_Id = ?",
    [id],
    (error,results)=>{
        if(error)
        throw error;
    response.status(200).json(results);
    });
};

const updateReserva = (request, response) => {
    const id = request.params.id;
    const { nombre, fecha, numper, nummesa, observaciones } = request.body;

    connection.query(
        "UPDATE reservaciones SET Reservaciones_Nombre = ?, Reservaciones_Fecha = ?, Reservaciones_NumPersonas = ?, Reservaciones_NoMesa = ?, Reservaciones_Observaciones  WHERE Reservaciones_Id = ?",
        [nombre, fecha, numper, nummesa, observaciones, id],
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
const postReservaciones = (request, response) => {
    const { id, nombre, fecha, numper, nummesa, observaciones, action } = request.body;

    if (action === "insert") {
        connection.query(
            "INSERT INTO reservaciones (Reservaciones_Nombre, Reservaciones_Fecha, Reservaciones_NumPersonas, Reservaciones_NoMesa, Reservaciones_Observaciones) VALUES (?, ?, ?, ?, ?)",
            [nombre, fecha, numper, nummesa, observaciones],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Reservacion añadida correctamente": results.affectedRows });
            }
        );
    }else if (action === "update") {
        connection.query(
            "UPDATE reservaciones SET Reservaciones_Nombre = ?, Reservaciones_Fecha = ?, Reservaciones_NumPersonas = ?, Reservaciones_NoMesa = ?, Reservaciones_Observaciones  WHERE Reservaciones_Id = ?",
            [nombre, fecha, numper, nummesa, observaciones, id],
            (error, results) => {
                if (error)
                    throw error;
                response.status(201).json({ "Reserva actualizada correctamente": results.affectedRows });
            }
        );
    }
};

//Delete
const delReservaciones = (request, response)=>{
    const id =request.params.id;
    connection.query("DELETE FROM reservaciones WHERE Reservaciones_Id = ?",[id],
    (error, results)=>{
        if(error)
            throw error;
        response.status(201).json({"Reserva eliminada":results.affectedRows});
    });
};

module.exports = {getReservaciones, postReservaciones, delReservaciones, getReservaId, updateReserva};