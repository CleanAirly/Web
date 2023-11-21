// Selecciona el botón por su id
const botonEditarPerfil = document.getElementById("editar-perfil");
const botonCerrarSesion = document.getElementById("cerrar-sesion");
const popupCerrarSesion = document.getElementById("popup-cerrar-sesion");
const aceptarCerrarSesion = document.getElementById("aceptar-cerrar");
const cancelarCerrarSesion = document.getElementById("cancelar-cerrar");
popupCerrarSesion.style.display="none";

botonCerrarSesion.addEventListener('click', () => {
    popupCerrarSesion.showModal();
    popupCerrarSesion.style.display="block";
})

function cerrarSalir(){
    popupCerrarSesion.close();
    popupCerrarSesion.style.display="none";
}

aceptarCerrarSesion.addEventListener('click',cerrarSalir);
cancelarCerrarSesion.addEventListener('click',cerrarSalir);


// Agrega un event listener para el evento de clic (click)
botonEditarPerfil.addEventListener("click", function() {
  // El código que se ejecutará cuando se haga clic en el botón
  window.location.href = 'editarPerfil.html';
});

const emailUsuario = localStorage.getItem('usuarioLogeado');
import { obtenerDatosUsuario } from './LogicaFake/LogicaFakePerfil.js';

obtenerDatosUsuario(emailUsuario)
    .then(resultado => {
        const nombreTexto = document.getElementById('nombreUsuario');
        const emailTexto = document.getElementById('emailUsuario');
        const telefonoTexto = document.getElementById('telefonoUsuario')
        nombreTexto.textContent = resultado.nombre;
        emailTexto.textContent = emailUsuario;
        telefonoTexto.textContent = resultado.telefono;

    })
    .catch((error) => {
        console.error('Error en la promesa:', error);
   });

    
    
    
    
    

