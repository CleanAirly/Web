// Inputs ------------------------------------------------------------------------------------------
const nombreUsuario = document.getElementById('nombre-usuario');
const txtemailUsuario = document.getElementById("email-usuario");
const telefonoUsuario = document.getElementById('telefono-usuario');
const txtEstadoSensor = document.getElementById("estado-sensor");

const idSensor = document.getElementById("problemas-sensor");

const emailUsuario = localStorage.getItem('usuarioLogeado');
console.log(emailUsuario)
// Botones ----------------------------------------------------------------------------------------
const botonGuardarCambios = document.getElementById('editar-perfil');
const botonCerrarSesion = document.getElementById("cerrar-sesion");
const cambiarContrasenya = document.getElementById("subrayado");

// Pop Up cerrar Sesión ----------------------------------------------------------------------------------------
const popupCerrarSesion = document.getElementById("popup-cerrar-sesion");
const aceptarCerrarSesion = document.getElementById("aceptar-cerrar");
const cancelarCerrarSesion = document.getElementById("cancelar-cerrar")

// Pop Up Guardar Cambios ---------------------------------------------------------------------------------------
const popupGuardar = document.getElementById("popup-guardar-cambios");
const guardarCambios= document.getElementById("guardar-cambios");
const cancelarGuardar= document.getElementById("cancelar-guardar");

import { obtenerDatosUsuario } from "./LogicaFake/LogicaFakePerfil.js";
import { inactividadSensor } from "./LogicaFake/LogicaFakePerfil.js";
import { guardarDatosPerfil } from './LogicaFake/LogicaFakeEditarPerfil2.js';


(async () => {
    try {

        const resultado = await obtenerDatosUsuario(emailUsuario);
        nombreUsuario.value = resultado.nombre;
        txtemailUsuario.textContent = emailUsuario;
        telefonoUsuario.value = resultado.telefono;
        idSensor.textContent = "Id: # " + resultado.idSonda;

        const datosInactividad = await inactividadSensor(emailUsuario);
        txtEstadoSensor.textContent ="Estado: "+ datosInactividad;
    } catch (error) {
        console.error('Error:', error);
    }
})();

// Guardar los cambios del perfil---------------------------------------------------------------------------------------
botonGuardarCambios.addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario (envío)
    popupGuardar.showModal();
    popupGuardar.style.display="block";
});
async function confirmarGuardar() {
    const nombre = nombreUsuario.value;
    const telefono = telefonoUsuario.value;
    // Luego puedes realizar otras acciones, como enviar los datos al servidor
    await guardarDatosPerfil(nombre, emailUsuario, telefono);
    location.href = 'home.html'
    popupGuardar.close();
    popupGuardar.style.display = "none";
}
function cerrarConfirmarGuardar(){
    popupGuardar.close();
    popupGuardar.style.display="none";
}

guardarCambios.addEventListener('click',confirmarGuardar);
cancelarGuardar.addEventListener('click',cerrarConfirmarGuardar);

//Boton Página cambiar Contraseña ------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------------------------------------
cambiarContrasenya.addEventListener("click", function(){
    // El código que se ejecutará cuando se haga clic en el botón
    window.location.href = 'restablecerContrasenya.html';
});
//Boton Pop Up Cerrar Sesión ------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------------------------------------
botonCerrarSesion.addEventListener('click', () => {
    popupCerrarSesion.showModal();
    popupCerrarSesion.style.display="block";
})

// Función para cerrar sesión----------------------------------------------------------------------------------------

//Aceptar el cierre de sesion
function realizarCierreDeSesion(){
    localStorage.removeItem('usuarioLogeado');
    localStorage.removeItem('usuarioRole');
    location.href = 'index.html';
    popupCerrarSesion.close();
    popupCerrarSesion.style.display="none";
}

//cerrar el Pop Up -----------------------------------------------------------------------------------------------------
function cerrarSalir() {
    popupCerrarSesion.close();
    popupCerrarSesion.style.display="none";
}

//en funcion de que botón pulses en el Pop Up realizar una acción u otra
aceptarCerrarSesion.addEventListener('click', realizarCierreDeSesion);
cancelarCerrarSesion.addEventListener('click', cerrarSalir);