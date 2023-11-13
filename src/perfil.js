// Selecciona el botón por su id
const botonEditarPerfil = document.getElementById("editar-perfil");

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
        nombreTexto.textContent = resultado;
        emailTexto.textContent = emailUsuario;
    })
    .catch((error) => {
        console.error('Error en la promesa:', error);
    });

