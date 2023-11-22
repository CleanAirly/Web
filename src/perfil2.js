// Selecciona el botón por su id
const botonEditarPerfil = document.getElementById("editar-perfil");
const botonCerrarSesion = document.getElementById("cerrar-sesion");
const popupCerrarSesion = document.getElementById("popup-cerrar-sesion");
const aceptarCerrarSesion = document.getElementById("aceptar-cerrar");
const cancelarCerrarSesion = document.getElementById("cancelar-cerrar");
const cambiarContrasenya = document.getElementById("subrayado");
popupCerrarSesion.style.display="none";

botonCerrarSesion.addEventListener('click', () => {
    popupCerrarSesion.showModal();
    popupCerrarSesion.style.display="block";
})

// Función para cerrar sesión
function realizarCierreDeSesion(){
    localStorage.removeItem('usuarioLogeado');
    window.location.href = 'index.html'; // Cambia 'index.html' por la página a la que deseas redirigir
}

function cerrarSalir(){
    if (e.target === aceptarCerrarSesion) {
        realizarCierreDeSesion();
    }
    popupCerrarSesion.close();
    popupCerrarSesion.style.display="none";
}

aceptarCerrarSesion.addEventListener('click', (e) => cerrarSalir(e));
cancelarCerrarSesion.addEventListener('click', (e) => cerrarSalir(e));


// Agrega un event listener para el evento de clic (click)
botonEditarPerfil.addEventListener("click", function() {
  // El código que se ejecutará cuando se haga clic en el botón
  window.location.href = 'editarPerfil.html';
});
cambiarContrasenya.addEventListener("click", function() {
    // El código que se ejecutará cuando se haga clic en el botón
    window.location.href = 'restablecerContrasenya.html';
});


const emailUsuario = localStorage.getItem('usuarioLogeado');
import { obtenerDatosUsuario } from './LogicaFake/LogicaFakePerfil.js';

obtenerDatosUsuario(emailUsuario)
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

    
    
    
    
    

