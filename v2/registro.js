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
	formulario.style.height = '295px';
	main.style.height = '640px';
	
	// Esconder desplegable de provincias
	const formularioProvincia = document.getElementsByClassName('provincias')[0];
	formularioProvincia.classList.add('escondido');
	
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
	
	for(let input of inputs){
		input.value = '';
	}
}

/**
* Función que hace aparecer el desplegable de provincias y lo carga
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
	
	const main = document.getElementsByTagName('main')[0];
	const formulario = document.getElementsByClassName('formulario')[0];
	
	// Cambiar medidas de contenedor principal y formulario tras aparecer desplegable de provincias
	main.style.height = '712px';
	formulario.style.height = '367px';
}

window.onload = iniciar;