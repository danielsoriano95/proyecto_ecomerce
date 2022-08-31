var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// creo un schema con la estructura de datos que tendran los documentos de esta coleccion
var Pago = new Schema(
    {
    cvv: Number,
    tc: String,
    td: String,
    email: String,
    env_ape: String,
    env_dir: String,
    env_nom: String,
    expiracion: String,
    tar_nom: String,
    tar_num: Number
    }
    //{versionKey: false}
);

// exportado , primero como se llama mi coleccion y despues la vinculacion con los datos de arriva
module.exports = mongoose.model('pagos', Pago)
