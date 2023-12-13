// Botones ----------------------------------------------------------------------------------------
const botonEditarPerfil = document.getElementById("editar-perfil");
const botonCerrarSesion = document.getElementById("cerrar-sesion");
const cambiarContrasenya = document.getElementById("subrayado");

// Pop Up cerrar Sesión ----------------------------------------------------------------------------------------
const popupCerrarSesion = document.getElementById("popup-cerrar-sesion");
const aceptarCerrarSesion = document.getElementById("aceptar-cerrar");
const cancelarCerrarSesion = document.getElementById("cancelar-cerrar")

import { obtenerDatosUsuario } from "./LogicaFake/LogicaFakePerfil.js";

(async () => {
    popupCerrarSesion.style.display="none";

    //Obtener los datos del usuario
    const emailUsuario = localStorage.getItem('usuarioLogeado');

    await obtenerDatosUsuario(emailUsuario)
        .then(resultado => {
            const nombreTexto = document.getElementById('nombreUsuario');
            const emailTexto = document.getElementById('emailUsuario');
            const telefonoTexto = document.getElementById('telefonoUsuario')
            nombreTexto.textContent = resultado.nombre;
            console.log(resultado)
            console.log(resultado.nombre)
            emailTexto.textContent = emailUsuario;
            telefonoTexto.textContent = resultado.telefono;

        })
        .catch((error) => {
            console.error('Error en la promesa:', error);
        });
})();

// Boton página editar perfil ----------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------------------------------------
botonEditarPerfil.addEventListener("click", function() {
    // El código que se ejecutará cuando se haga clic en el botón
    window.location.href = 'editarPerfil.html';
});
//Boton Página cambiar Contraseña ------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------------------------------------
cambiarContrasenya.addEventListener("click", function() {
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