

/* 
   Variables globales
*/

var colores;
var secuencia;
var secuenciaJugador;
var nivel;
var puntaje;
var nombreJugador;
var puedeJugar;

/* 
   Inicializacion
*/

function iniciarAplicacion() {
	var botonIniciar;
	var botonesColores;
	var botonReiniciar;

	colores = ['rojo', 'verde', 'azul', 'amarillo'];

	botonIniciar = document.getElementById('btnIniciar');
	botonesColores = document.querySelectorAll('.color');
	botonReiniciar = document.getElementById('btnReiniciar');

	botonIniciar.addEventListener('click', iniciarPartida);
	botonReiniciar.addEventListener('click', reiniciarJuego);

	agregarEventosColores(botonesColores);
}

/*
   Inicio de la partida
*/

function iniciarPartida() {
	var inputNombre;

	inputNombre = document.getElementById('nombreJugador');
	nombreJugador = inputNombre.value.trim();

	if (nombreJugador.length < 3) {
		alert('El nombre debe tener al menos 3 letras');
		return;
	}

	document.getElementById('nombreMostrado').textContent = nombreJugador;
	document.getElementById('inicio').classList.add('oculto');
	document.getElementById('juego').classList.remove('oculto');

	iniciarJuego();
}

function iniciarJuego() {
	secuencia = [];
	secuenciaJugador = [];
	nivel = 1;
	puntaje = 0;
	puedeJugar = false;

	actualizarInfo();
	agregarColor();
}

/* 
   Logica del juego
*/

function agregarColor() {
	var indiceAleatorio;
	var color;

	indiceAleatorio = Math.floor(Math.random() * colores.length);
	color = colores[indiceAleatorio];

	secuencia.push(color);
	mostrarSecuencia();
}

function mostrarSecuencia() {
	var i;

	puedeJugar = false;
	secuenciaJugador = [];

	for (i = 0; i < secuencia.length; i++) {
		mostrarColor(secuencia[i], i);
	}

	setTimeout(habilitarJugador, secuencia.length * 600);
}

function mostrarColor(color, posicion) {
	var boton;

	boton = document.querySelector('[data-color="' + color + '"]');

	setTimeout(function () {
		boton.classList.add('activo');

		setTimeout(function () {
			boton.classList.remove('activo');
		}, 300);

	}, posicion * 600);
}

function habilitarJugador() {
	puedeJugar = true;
}

/*
   Interaccion del jugador
*/

function agregarEventosColores(botones) {
	var i;

	for (i = 0; i < botones.length; i++) {
		botones[i].addEventListener('click', manejarClickColor);
	}
}

function manejarClickColor(evento) {
	var colorSeleccionado;

	if (puedeJugar === false) {
		return;
	}

	colorSeleccionado = evento.target.getAttribute('data-color');
	secuenciaJugador.push(colorSeleccionado);
	verificarSecuencia();
}

function verificarSecuencia() {
	var posicion;

	posicion = secuenciaJugador.length - 1;

	if (secuenciaJugador[posicion] !== secuencia[posicion]) {
		mostrarModal();
		return;
	}

	puntaje = puntaje + 1;
	actualizarInfo();

	if (secuenciaJugador.length === secuencia.length) {
		nivel = nivel + 1;
		actualizarInfo();
		setTimeout(agregarColor, 800);
	}
}

/* 
   UI y modal
*/

function actualizarInfo() {
	document.getElementById('nivelActual').textContent = nivel;
	document.getElementById('puntaje').textContent = puntaje;
}

function mostrarModal() {
	document.getElementById('modalPerder').classList.remove('oculto');
}

function reiniciarJuego() {
	document.getElementById('modalPerder').classList.add('oculto');
	document.getElementById('inicio').classList.remove('oculto');
	document.getElementById('juego').classList.add('oculto');
}

/* 
   Load
*/

window.addEventListener('load', iniciarAplicacion);
