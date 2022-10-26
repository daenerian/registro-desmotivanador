/**
* Función que se ejecuta al cargar la página web y que incorpora los eventos iniciales a los elementos
*/
function iniciar(){
	let imagen = document.getElementsByClassName('imagen')[0];
	let aceptar = document.getElementsByName('aceptar')[0];
	let cancelar = document.getElementsByName('cancelar')[0];
	imagen.addEventListener('click', mostrarFormulario);
	aceptar.addEventListener('click', registrarUsuario);
	cancelar.addEventListener('click', borrarCampos);
}

/**
* Función que hace aparecer el formulario
*/
function mostrarFormulario(){
	// Borrado de mensaje de registro exitoso
	borrarCampos();
	let main = document.getElementsByTagName('main')[0];
	let mensaje = document.getElementsByTagName('p')[0];
	if(mensaje != undefined){
		main.removeChild(mensaje);
	}
	
	// Remover clase que esconde el formulario
	let formulario = document.getElementsByClassName('formulario')[0];
	formulario.classList.remove('escondido');
	
	// Cambiar medidas de contenedor principal y formulario
	formulario.style.height = '225px';
	main.style.height = '570px';
}

/**
* Función que hace desaparecer el formulario y muestra un mensaje de que la operación ha sido exitosa
*/
function registrarUsuario(){
	// Adicionar clase que esconde el formulario
	let formulario = document.getElementsByClassName('formulario')[0];
	formulario.classList.add('escondido');
	
	// Adicionar mensaje de registro exitoso
	let main = document.getElementsByTagName('main')[0];
	let p = document.createElement('p');
	main.appendChild(p);
	p.setAttribute('class', 'titulo');
	p.appendChild(document.createTextNode('El usuario ha sido registrado'));
	
	// Cambiar medidas de contenedor principal tras registrar un usuario
	main.style.height = '370px';
}

/**
* Función que limpia los campos de los inputs
*/
function borrarCampos(){
	let inputs = [];
	inputs.push(document.getElementsByTagName('input')[0]);
	inputs.push(document.getElementsByTagName('input')[1]);
	
	for(let input of inputs){
		input.value = '';
	}
}

window.onload = iniciar;