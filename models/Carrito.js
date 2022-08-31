var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// creo un schema con la estructura de datos que tendran los documentos de esta coleccion
var Carrito = new Schema(
    {
    foto: String,        
    tipo: String,
    nombre: String,
    valor: Number,
    cantidad: Number
    }
    //{versionKey: false}
);

// exportado , primero como se llama mi coleccion y despues la vinculacion con los datos de arriva
module.exports = mongoose.model('carritos', Carrito)
