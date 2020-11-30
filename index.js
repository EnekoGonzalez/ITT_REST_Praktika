
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let suma = {
	X: 0, 
	Y: 0, 
	Resultado: 5
};

let respuesta = {
	error: false, 
	codigo: 200,
	mensaje:''
};

app.get('/', function(req, res){
	respuesta = {
		error: true, 
		codigo: 200, 
		mensaje:'Punto de inicio' 
	};
	res.send(respuesta);
});

app.route('/calculadora')
	.get(function (req, res) {
		respuesta = {
			error: false,
			codigo: 200,
   			mensaje: ''
		};
		if(suma.X === 0 || suma.Y === 0) {
			respuesta = {
				error: true,
				codigo: 501,
				mensaje: 'La suma no ha sido creada'
			};
		} else {
			respuesta = {
				error: false,
				codigo: 200,
				mensaje: 'respuesta de la suma',
				respuesta: suma
			};
		}
		res.send(respuesta);
	})
	.post(function (req, res) {
		if(!req.body.X || !req.body.Y) {
			respuesta = {
				error: true,
				codigo: 502,
				mensaje: 'Los campos X e Y son requeridos'
			};
		} else {
			if(suma.X !== 0 || suma.Y !== 0) {
				respuesta = {
					error: true,
					codigo: 503,
					mensaje: 'La suma ya fue creada previamente'
				};
			} else {
				suma = {
					X: req.body.X,
					Y: req.body.Y,
					Resultado: parseInt(req.body.X)+parseInt(req.body.Y)
				};
				respuesta = {
					error: false,
					codigo: 200,
					mensaje: 'Suma hecha',
					respuesta: suma
				};
			}
		} 
		res.send(respuesta);
	})
	.put(function (req, res) {
		if(!req.body.X || !req.body.Y) {
			respuesta = {
				error: true,
				codigo: 502,
				mensaje: 'Los campos X e Y son requeridos'
			};
		} else {
			if(suma.X === 0 || suma.Y === 0) {
				respuesta = {
					error: true,
					codigo: 501,
					mensaje: 'El usuario no ha sido creado'
				};
			} else {
				suma = {
					X: req.body.X,
					Y: req.body.Y,
					Resultado: parseInt(req.body.X)+parseInt(req.body.Y)
				};
				respuesta = {
					error: false,
					codigo: 200,
					mensaje: 'Suma actualizada',
					respuesta: suma
				};
			}
		}  
		res.send(respuesta);
	})
	.delete(function (req, res) {
		if(suma.X === 0 || suma.Y === 0) {
			respuesta = {    
				error: true,
				codigo: 501,
				mensaje: 'La suma no ha sido creada'
			};
		} else {
			respuesta = {
				error: false,
				codigo: 200,
				mensaje: 'Suma borrada'
			};
			suma = { 
				X: 0, 
				Y: 0, 
				Resultado: 0 
			};
		}
		res.send(respuesta);
});

app.use(function(req, res, next) {
	respuesta = {
		error: true,
		codigo: 404,
		mensaje: 'URL no encontrada'
	};
	res.status(404).send(respuesta);
});

app.listen(port, () => {
  console.log("El servidor est'a inicializado en el puerto 3000")
})

