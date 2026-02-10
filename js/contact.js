
function iniciarContacto() {
	var formulario;

	formulario = document.getElementById('formContacto');
	formulario.addEventListener('submit', enviarFormulario);
}

function enviarFormulario(evento) {
	var nombre;
	var mail;
	var mensaje;

	evento.preventDefault();

	nombre = document.getElementById('nombreContacto').value.trim();
	mail = document.getElementById('mailContacto').value.trim();
	mensaje = document.getElementById('mensajeContacto').value.trim();

	if (validarNombre(nombre) === false) {
		alert('El nombre debe ser alfanumérico');
		return;
	}

	if (validarMail(mail) === false) {
		alert('El email no es válido');
		return;
	}

	if (mensaje.length <= 5) {
		alert('El mensaje debe tener < 5 caracteres');
		return;
	}

	abrirEmail(nombre, mail, mensaje);
}

function validarNombre(nombre) {
	var regex;

	regex = /^[a-zA-Z0-9 ]+$/;
	return regex.test(nombre);
}

function validarMail(mail) {
	var regex;

	regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(mail);
}

function abrirEmail(nombre, mail, mensaje) {
	var asunto;
	var cuerpo;
	var enlace;

	asunto = 'Contacto desde Simon Says';
	cuerpo = 'Nombre: ' + nombre + '%0D%0A';
	cuerpo = cuerpo + 'Email: ' + mail + '%0D%0A%0D%0A';
	cuerpo = cuerpo + mensaje;

	enlace = 'mailto:correo@ejemplo.com?subject=' + asunto + '&body=' + cuerpo;
	window.location.href = enlace;

}

window.location.href =
		'mailto:correo@ejemplo.com?subject=' + asunto + '&body=' + cuerpo;

