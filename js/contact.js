function iniciarContacto() {
	var formulario = document.getElementById('formContacto');
	var inputNombre = document.getElementById('nombreContacto');
	var inputMail = document.getElementById('mailContacto');
	var inputMensaje = document.getElementById('mensajeContacto');

	formulario.addEventListener('submit', enviarFormulario);
	
	// Validación en tiempo real
	inputNombre.addEventListener('blur', validarNombreEnTiempoReal);
	inputMail.addEventListener('blur', validarMailEnTiempoReal);
	inputMensaje.addEventListener('blur', validarMensajeEnTiempoReal);
	
	// Limpiar error cuando escriben
	inputNombre.addEventListener('input', function() {
		limpiarError('errorNombre');
	});
	inputMail.addEventListener('input', function() {
		limpiarError('errorMail');
	});
	inputMensaje.addEventListener('input', function() {
		limpiarError('errorMensaje');
	});
}

function enviarFormulario(evento) {
	evento.preventDefault();

	var nombre = document.getElementById('nombreContacto').value.trim();
	var mail = document.getElementById('mailContacto').value.trim();
	var mensaje = document.getElementById('mensajeContacto').value.trim();

	if (!validarNombre(nombre)) {
		mostrarError('errorNombre', 'El nombre debe ser alfanumérico y tener al menos 3 caracteres');
		return;
	}

	if (!validarMail(mail)) {
		mostrarError('errorMail', 'El email no es válido');
		return;
	}

	if (mensaje.length <= 5) {
		mostrarError('errorMensaje', 'El mensaje debe tener más de 5 caracteres');
		return;
	}

	abrirEmail(nombre, mail, mensaje);
	limpiarFormulario();
	mostrarMensajeExito();
}

function validarNombre(nombre) {
	var regex = /^[a-zA-Z0-9 ]+$/;
	return regex.test(nombre) && nombre.length >= 3;
}

function validarMail(mail) {
	var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(mail);
}

function validarNombreEnTiempoReal() {
	var nombre = document.getElementById('nombreContacto').value.trim();
	
	if (nombre.length === 0) {
		mostrarError('errorNombre', 'El nombre es requerido');
		return false;
	}

	if (nombre.length < 3) {
		mostrarError('errorNombre', 'El nombre debe tener al menos 3 caracteres');
		return false;
	}

	if (!validarNombre(nombre)) {
		mostrarError('errorNombre', 'El nombre debe ser alfanumérico');
		return false;
	}

	limpiarError('errorNombre');
	return true;
}

function validarMailEnTiempoReal() {
	var mail = document.getElementById('mailContacto').value.trim();
	
	if (mail.length === 0) {
		mostrarError('errorMail', 'El email es requerido');
		return false;
	}

	if (!validarMail(mail)) {
		mostrarError('errorMail', 'El email no es válido');
		return false;
	}

	limpiarError('errorMail');
	return true;
}

function validarMensajeEnTiempoReal() {
	var mensaje = document.getElementById('mensajeContacto').value.trim();
	
	if (mensaje.length === 0) {
		mostrarError('errorMensaje', 'El mensaje es requerido');
		return false;
	}

	if (mensaje.length <= 5) {
		mostrarError('errorMensaje', 'El mensaje debe tener más de 5 caracteres');
		return false;
	}

	limpiarError('errorMensaje');
	return true;
}

function mostrarError(idError, mensaje) {
	var elementoError = document.getElementById(idError);
	elementoError.textContent = mensaje;
	elementoError.style.display = 'block';
}

function limpiarError(idError) {
	var elementoError = document.getElementById(idError);
	elementoError.textContent = '';
	elementoError.style.display = 'none';
}

function limpiarFormulario() {
	document.getElementById('nombreContacto').value = '';
	document.getElementById('mailContacto').value = '';
	document.getElementById('mensajeContacto').value = '';
}

function mostrarMensajeExito() {
	var mensajeExito = document.getElementById('mensajeExito');
	mensajeExito.classList.remove('oculto');
	
	// Ocultar el mensaje después de 3 segundos
	setTimeout(function() {
		mensajeExito.classList.add('oculto');
	}, 3000);
}

function abrirEmail(nombre, mail, mensaje) {
	var asunto = encodeURIComponent('Contacto desde Simon Says');
	var cuerpo = 'Nombre: ' + nombre + '\n' +
		'Email: ' + mail + '\n\n' +
		mensaje;
	cuerpo = encodeURIComponent(cuerpo);

	var enlace = 'mailto:contacto@simonsays.com?subject=' + asunto + '&body=' + cuerpo;
	window.location.href = enlace;
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', iniciarContacto);
