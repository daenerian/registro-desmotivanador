/**
* Función que se ejecuta al cargar la página web y que incorpora los eventos iniciales a los elementos
*/
function iniciar(){
	const imagen = document.getElementsByClassName('imagen')[0];
	const aceptar = document.getElementsByName('aceptar')[0];
	const cancelar = document.getElementsByName('cancelar')[0];
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
	const perry = document.getElementById('perry');
	perry.classList.add('escondido');
	const main = document.getElementsByTagName('main')[0];
	const mensaje = document.getElementsByTagName('p')[0];
	if(mensaje != undefined){
		main.removeChild(mensaje);
	}
	
	// Carga de opciones para el desplegable de comunidades
	const formulario = document.getElementsByClassName('formulario')[0];
	const comunidades = ['Andalucía', 'Aragón', 'Asturias', 'Islas Baleares', 'Canarias', 'Cantabria', 'Castilla y León',
						'Castilla-La Mancha', 'Cataluña', 'Comunidad Valenciana', 'Extremadura', 'Galicia',
						'Comunidad de Madrid', 'Región de Murcia', 'Comunidad de Navarra', 'País Vasco', 'La Rioja',
						'Ciudad Autónoma de Ceuta', 'Ciudad Autónoma de Melilla'];
	const iComunidades = ['andalucia', 'aragon', 'asturias', 'baleares', 'canarias', 'cantabria', 'castillaLeon',
						'castillaMancha', 'cataluna', 'comunidadValenciana', 'extremadura', 'galicia',
						'madrid', 'murcia', 'navarra', 'paisVasco', 'laRioja',
						'ceuta', 'melilla'];
	
	const desplegable = document.getElementsByClassName('comunidades')[0];
	desplegable.value = "0";
	for(let i=0;i<comunidades.length;i++){
		let opcion = document.createElement('option');
		opcion.appendChild(document.createTextNode(comunidades[i]));
		opcion.value = iComunidades[i];
		desplegable.appendChild(opcion);
	}
	
	// Adición de evento para mostrar el desplegable de provincias
	desplegable.addEventListener('change', mostrarProvincias);
	
	// Remover clase que esconde el formulario
	formulario.classList.remove('escondido');
	
	// Cambiar medidas de contenedor principal y formulario
	cambiarTamano(1272, 927);
	
	// Esconder desplegable de provincias
	const formularioProvincia = document.getElementsByClassName('provincias')[0];
	formularioProvincia.classList.add('escondido');
	
	// Comprobar edad
	const fechaNac = document.getElementsByTagName('input')[2];
	fechaNac.addEventListener('change', comprobarEdad);
	
	// Evento pasar ratón
	perry.addEventListener('mouseover', cambiarPhinFerb);
	perry.addEventListener('mouseout', cambiarDoofen);
	
	// Drag & Drop
	const divIzquierdo = document.getElementById('izquierdo');
	const divDerecho = document.getElementById('derecho');
	const candace = divIzquierdo.getElementsByTagName('img');
	let contador = 0;
	for(let imagen of candace){
		imagen.setAttribute('id', 'candace' + contador);
		imagen.setAttribute('draggeable', 'true');
		imagen.addEventListener('dragstart', cogerElemento);
		contador++;
	}
	
	divIzquierdo.addEventListener('dragover', permitirDrop);
	divIzquierdo.addEventListener('drop', devolverElemento);
	
	divDerecho.addEventListener('dragover', permitirDrop);
	divDerecho.addEventListener('drop', soltarElemento);
}

/**
* Función que calcula la edad de la persona que esta rellenando el formulario, si tiene 10 años o menos aparecer
* una imagen de Perry el ornitorrinco
* @param {Event} evento Evento que se acciona tras seleccionar una fecha en el campo de fecha de nacimiento
*/
function comprobarEdad(evento){
	// Calcular edad actual
	const fechaNac = new Date(evento.target.value);
	const fechaActual = new Date();
	let diferencia = Math.abs((fechaActual.getTime() - fechaNac.getTime()) / (1000 *60 * 60 * 24));
	diferencia = Math.floor(diferencia / 365.25);
	
	// Mostrar u ocultar a Perry
	const perry = document.getElementById('perry');
	const formularioProvincia = document.getElementsByClassName('provincias')[0];
	if(diferencia>9 && !formularioProvincia.classList.contains('escondido')){
		perry.classList.add('escondido');
		cambiarTamano(1342, 997);
		return;
	}
	if(diferencia>9 && formularioProvincia.classList.contains('escondido')){
		perry.classList.add('escondido');
		cambiarTamano(1272, 927);
		return;
	}
	if(diferencia<10 && !formularioProvincia.classList.contains('escondido')){
		perry.classList.remove('escondido');
		cambiarTamano(1507, 1162);
		return;
	}
	
	perry.classList.remove('escondido');
	cambiarTamano(1417, 1092);
	
}

/**
* Función que cambia la imagen de Doofenshmirtz por una de Phineas y Ferb al poner el ratón eb la imagen de Perry
*/
function cambiarPhinFerb(){
	const imagen = document.getElementsByTagName('img')[0];
	imagen.setAttribute('src', 'phineas-ferb.jpg');
	
}

/**
* Función que cambia devuelta a la imagen de Doofenshmirtz al quitar el ratón de la imagen de Perry
*/
function cambiarDoofen(){
	const imagen = document.getElementsByTagName('img')[0];
	imagen.setAttribute('src', 'doofenshmirtz.jpg');
	
}

/**
* Función que recoge los datos del elemento que se ha agarrado con el ratón
* @param {Event} evento Evento que sucede al agarrar un elemento que es draggeable
*/
function cogerElemento(evento){
	evento.dataTransfer.setData('text/plain', evento.target.id);
}

/**
* Función que permite a los elementos que arrastren elementos hacia ellos
* @param {Event} evento Evento que sucede al poner sobre un elemento el elemento agarrado por el ratón
*/
function permitirDrop(evento){
	evento.preventDefault();
}

/**
* Función que deja el elemento en el div izquierdo
* @param {Event} evento Evento que deja el elemento agarrado en el div izquierdo
*/
function devolverElemento(evento){
	const divIzquierdo = document.getElementById('izquierdo');
	const id = evento.dataTransfer.getData('text/plain');
	const devuelto = document.getElementById(id);
	
	divIzquierdo.appendChild(devuelto);
}

/**
* Función que deja el elemento en el div derecho
* @param {Event} evento Evento que deja el elemento agarrado en el div derecho
*/
function soltarElemento(evento){
	const divDerecho = document.getElementById('derecho');
	const id = evento.dataTransfer.getData('text/plain');
	const arrastrado = document.getElementById(id);
	
	divDerecho.appendChild(arrastrado);
}

/**
* Función que hace desaparecer el formulario y muestra un mensaje de que la operación ha sido exitosa
*/
function registrarUsuario(){
	// Adicionar clase que esconde el formulario
	const formulario = document.getElementsByClassName('formulario')[0];
	formulario.classList.add('escondido');
	
	// Adicionar mensaje de registro exitoso
	const main = document.getElementsByTagName('main')[0];
	const p = document.createElement('p');
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
	inputs.push(document.getElementsByTagName('input')[2]);
	
	for(let input of inputs){
		input.value = '';
	}
}

/**
* Función que hace aparecer el desplegable de provincias y lo carga
* @param {Event} evento Evento de la selección de una opción del desplegable de comunidades autónomas
*/
function mostrarProvincias(evento){
	// Borrado de provincias al cambiar de selección
	const desplegable = document.getElementsByClassName('provincias')[1];
	while(desplegable.firstChild){
		desplegable.removeChild(desplegable.firstChild);
	}
	
	// Poner la opción por defecto tras el borrado
	const opDefault = document.createElement('option');
	opDefault.setAttribute('selected', 'true');
	opDefault.setAttribute('disabled', 'disabled');
	opDefault.appendChild(document.createTextNode('Selecciona la provincia'));
	desplegable.appendChild(opDefault);
	
	// Carga de opción del desplegable de provincias
	const provincias = {
							andalucia: ['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Málaga', 'Sevilla'],
							aragon: ['Huesca', 'Teruel', 'Zaragoza'],
							asturias: ['Oviedo'],
							baleares: ['Palma de Mallorca'],
							canarias: ['Santa Cruz de Tenerife', 'Las Palmas de Gran Canaria'],
							cantabria: ['Santander'],
							castillaLeon: ['Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo'],
							castillaMancha: ['Ávila', 'Burgos', 'León', 'Salamanca', 'Segovia', 'Soria', 'Valladolid', 'Zamora'],
							cataluna: ['Barcelona', 'Gerona', 'Lérida', 'Tarragona'],
							comunidadValenciana: ['Alicante', 'Castellón de la Plana', 'Valencia'],
							extremadura: ['Badajoz', 'Cáceres'],
							galicia: ['La Coruña', 'Lugo', 'Orense', 'Pontevedra'],
							madrid: ['Madrid'],
							murcia: ['Murcia'],
							navarra: ['Pamplona'],
							paisVasco: ['Bilbao', 'San Sebastián', 'Vitoria'],
							laRioja: ['Logroño'],
							ceuta: ['Ceuta'],
							melilla: ['Melilla']
						};
	const comunidad = evento.target.value;
	const formularioProvincia = document.getElementsByClassName('provincias')[0];
	for(let i=0;i<provincias[comunidad].length;i++){
		let opcion = document.createElement('option');
		opcion.appendChild(document.createTextNode(provincias[comunidad][i]));
		opcion.value = i;
		desplegable.appendChild(opcion);
	}
	
	// Remover clase que esconde el desplegable de provincias
	formularioProvincia.classList.remove('escondido');
	
	// Cambiar medidas de contenedor principal y formulario tras aparecer desplegable de provincias
	const perry = document.getElementById('perry');
	cambiarTamano(1342, 997);
	if(!perry.classList.contains('escondido')){
		cambiarTamano(1507, 1162);
	}
}

/**
* Función que cambiar manualmente los valores de altura del main y el formulario para hacer una transición animada con CSS
* @param {String} tamMain Tamaño deseado para el elemento main
* @param {String} tamFormulario Tamaño deseado para el formulario
*/
function cambiarTamano(tamMain, tamFormulario){
	const main = document.getElementsByTagName('main')[0];
	const formulario = document.getElementsByClassName('formulario')[0];
	
	main.style.height = tamMain + 'px';
	formulario.style.height = tamFormulario + 'px';
}

window.onload = iniciar;