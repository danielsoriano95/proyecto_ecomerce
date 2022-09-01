var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const Productos = require('./models/Productos');


mongoose
.connect(
    "mongodb+srv://danielsoriano95:Colombia1995@cluster0.mxi4o.mongodb.net/BD_IMARA?retryWrites=true&w=majority"
)
.then(function(db){
    console.log("Conectado a la base de datos");
})
.catch(function(err){
    console.log(err);
})


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/estilos'));
app.use(express.static('materas'));

// importo modelo de datos

var Prods = require('./models/Productos');
var Cars = require('./models/Carrito');
var Pags = require('./models/Pagos');

// Rutas 

//***GET para los html
app.get("/productos", function(req, res){
    res.sendFile(__dirname + '/index.html');
    
});

app.get("/carrito", function(req, res){
    res.sendFile(__dirname + "/carrito.html");
});

app.get('/pago', function(req, res){
    res.sendFile(__dirname + "/pago.html");
});

app.get("/producto/:id", async function (req, res) {
    res.sendFile(__dirname + "/prod_detalle.html");
});


//** GET para los datos de los productos
app.get("/productos_load", async function(req, res){
    var busqueda = await Prods.find();
    var grid = "";
    
    for(var i=0; i<2; i++){
        grid = grid + '<div class="row pt-5">';
        grid = grid + '<div class="col col_producto">';
        grid = grid + '<a  href="/producto/'+ busqueda[i]._id +'"><img src="'+ busqueda[i].foto+'" alt="producto 1" class="img_producto"></a>';
        grid = grid + '<label>'+ busqueda[i].nombre +'</label>';  
        grid = grid + '<br><label> $'+ busqueda[i].valor +'</label>'; 
        grid = grid + '</div>';
        grid = grid + '<div class="col col_producto">';
        grid = grid + '<a  href="/producto/' + busqueda[i+2]._id +'"><img src="'+ busqueda[i+2].foto+'" alt="producto 1" class="img_producto"></a>';
        grid = grid + '<label>'+ busqueda[i+2].nombre +'</label>';
        grid = grid + '<br><label> $'+ busqueda[i].valor +'</label>'; 
        grid = grid + '</div>';
        grid = grid + '<div class="col col_producto">';
        grid = grid + '<a href="/producto/'+busqueda[i+4]._id+'"><img src="'+ busqueda[i+4].foto+'" alt="producto 1" class="img_producto"></a>';
        grid = grid + '<label>'+ busqueda[i+4].nombre +'</label>';
        grid = grid + '<br><label> $'+ busqueda[i].valor +'</label>'; 
        grid = grid + '</div>';
        grid = grid + '</div>';
         
    }
    res.send(grid);
});


//**Get del carrito de compras */
app.get("/carrito_load", async function (req, res){
    var producto = await Cars.find();
    //var ss= producto[0].foto;
    var a = "";
    var total = 0;
    
    
    for(var i=0; i < producto.length; i++){
        total = total + producto[i].valor * producto[i].cantidad;
        a = a + '<tr>';
        //a = a + '<div class="div_img_carrito"><td><img class="img_carrito" src="'+ producto[i].foto +'"></td></div>';
        a = a + '<td class="ps-2">' + producto[i].nombre + '</td>';
        a = a + '<td class="ps-4">' + producto[i].valor + '</td>';
        a = a + '<td class="ps-2">' + producto[i].cantidad + '</td>';
        a = a + '<td class="ms-2"> <button id="' + producto[i]._id + '" class="eliminar btn btn-warning"> Eliminar</button></td>'; 
        a = a + '</tr>';
    }
    a = a + '<tr>'
    a = a + '<td class="ps-4 pt-5">Total</td>'
    a = a + '</tr>'
    a = a + '<tr>'
    a = a + '<td class="ps-2 pt-1"><h3>'+ total +'</h3></td>';
    a = a + '</tr>'

    console.log(total);
    res.send(a);
});

/* ESTO ES EL EJEMPLO PARA LLAMAR LOS DATOS DE LA BASE DE DATOS AL SERVIDOR Y USARLOS
//EJEMPLO CON LA BASE DE DATOS DE PERSONAS QUE TENIAMOS

app.delete('/persona/:dato', async function(req, res){
    var parametro = req.params.dato;
    console.log("Eliminando el documento con ID: " + parametro);

    var p = await Pers.findById(parametro);
    await p.remove();

    res.send("La persona se elimino correctamente");
});



app.get("/carrito", async function (req, res){
    var documentos = await Cars.find();
    var a = "";
    
    for (var i=0; i < documentos.lenght; i++){
        var a = a + "<tr>";
        var a = a + "<td>" + documentos[i].nombre + '</td>';
        var a = a + "<td>" + documentos[i].apellido + '</td>';
        var a = a + "<td> <button id=" + documentos[i].id + "'class = 'eliminar'> Eliminar</button></td>";
        var a = a + "<tr>";
    }   
    res.send(a);
});
*/



//**POST
app.post('/producto/:id', async function(req, res){
    var identificador = req.params.id;
    var producto = await Prods.findById(identificador);
    res.send(producto);
    /*var grid = "";

    grid = grid + '<div class="row">';
    grid = grid + '<div class="col col_det Productos">';
    grid = grid + '<a id="Producto" href="/producto_1"><img src="/resources/materas/IMG_3117" alt="producto 1" class="img_producto"></a>';
    grid = grid + '</div>';
    grid = grid + '</div>';
    grid = grid + '<div class="row pt-2">';
    grid = grid + '<div class="col">';
    grid = grid + '<h5>' + producto.nombre + '</h5>';
    grid = grid + '<span>' + producto.valor + '</span>';
    grid = grid + '<p>' + producto.descripcion + '</p>';
    grid = grid + '</div>';
    grid = grid + '</div>';
    
    res.send(grid);*/  
});


app.post('/pr1_buy', async function(req, res){
    var producto = req.body;
    var p = new Cars(producto); 
    await p.save();
    res.send('producto agregado');
});

app.post('/pago_conf', async function(req, res){
    
});

app.post("/pago_fin", async function(req, res){
    var info_pago = req.body;
    var p = new Pags(info_pago);
    await p.save()
    res.send(info_pago);
});


//** DELETE PARA LA LISTA DEL CARRITO DE COMPRAS */



app.delete('/producto/:dato', async function(req, res){
    var parametro = req.params.dato;
    console.log("Eliminando el documento con ID: " + parametro);

    var p = await Cars.findById(parametro);
    await p.remove();

    res.send("Se elimino correctamente");
});
/*
app.delete('/persona/:dato', async function(req, res){
    var parametro = req.params.dato;
    console.log("Eliminando el documento con ID: " + parametro);

    var p = await Pers.findById(parametro);
    await p.remove();

    res.send("La persona se elimino correctamente");
});
*/ 
// Listen
app.listen(3000, function(req, res){
    console.log('conectado al puerto 3000 de productos')
});

