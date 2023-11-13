// Selecciona el botón por su id
const botonEditarPerfil = document.getElementById("cancelar-editar-perfil");

// Agrega un event listener para el evento de clic (click)
botonEditarPerfil.addEventListener("click", function() {
  // El código que se ejecutará cuando se haga clic en el botón
  window.location.href = 'perfil.html';
});

import { obtenerDatosUsuario } from './LogicaFake/LogicaFakePerfil.js';
const emailUsuario = localStorage.getItem('usuarioLogeado');

obtenerDatosUsuario(emailUsuario)
    .then(resultado => {
        const nombreTexto = document.getElementById('nombreUsuario');
        const emailTexto = document.getElementById('emailUsuario');
        const telefonoTexto = document.getElementById('telefonoUsuario');
        nombreTexto.value = resultado;
        emailTexto.value = emailUsuario;
        telefonoTexto.value = "123456789";
    })
    .catch((error) => {
        console.error('Error en la promesa:', error);
    });



import { guardarDatosPerfil } from './LogicaFake/LogicaFakeEditarPerfil.js';

// Obtén una referencia al botón "Guardar cambios"
const botonGuardarCambios = document.getElementById('editar-perfil');

// Agregar un controlador de eventos al botón
botonGuardarCambios.addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario (envío)

    // Aquí puedes realizar las acciones que desees al hacer clic en el botón
    // Por ejemplo, puedes obtener los valores de los campos de entrada
    const nombre = document.getElementById('nombreUsuario').value;
    const email = document.getElementById('emailUsuario').value;
    const telefono = document.getElementById('telefonoUsuario').value;
    // Luego puedes realizar otras acciones, como enviar los datos al servidor
    guardarDatosPerfil(nombre, email, telefono);
});
