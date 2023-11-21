// Selecciona el botón por su id
const botonEditarPerfil = document.getElementById("cancelar-editar-perfil");
const popupSalir = document.getElementById("popup-cancelar-cambios");
const salirEditar= document.getElementById("aceptar-salir");
const cancelarSalirEditar= document.getElementById("cancelar-salir");

const botonGuardarCambios = document.getElementById('editar-perfil');
const popupGuardar = document.getElementById("popup-guardar-cambios");
const guardarCambios= document.getElementById("guardar-cambios");
const cancelarGuardar= document.getElementById("cancelar-guardar");

popupGuardar.style.display="none";
popupSalir.style.display="none";

import { obtenerDatosUsuario } from './LogicaFake/LogicaFakePerfil.js';
const emailUsuario = localStorage.getItem('usuarioLogeado');

obtenerDatosUsuario(emailUsuario)
    .then(resultado => {
        const nombreTexto = document.getElementById('nombreUsuario');
        const emailTexto = document.getElementById('emailUsuario');
        const telefonoTexto = document.getElementById('telefonoUsuario');
        nombreTexto.value = resultado.nombre;
        emailTexto.value = emailUsuario;
        telefonoTexto.value = resultado.telefono;
    })
    .catch((error) => {
        console.error('Error en la promesa:', error);
    });

import { guardarDatosPerfil } from './LogicaFake/LogicaFakeEditarPerfil.js';

// Obtén una referencia al botón "Guardar cambios"

// Agregar un controlador de eventos al botón
botonGuardarCambios.addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario (envío)
    
    popupGuardar.showModal();
    popupGuardar.style.display="block";
    // Aquí puedes realizar las acciones que desees al hacer clic en el botón
    // Por ejemplo, puedes obtener los valores de los campos de entrada
});

botonEditarPerfil.addEventListener('click', () => {
    popupSalir.showModal();
    popupSalir.style.display="block";
})


function confirmarGuardar(){
    const nombre = document.getElementById('nombreUsuario').value;
    const email = document.getElementById('emailUsuario').value;
    const telefono = document.getElementById('telefonoUsuario').value;
    // Luego puedes realizar otras acciones, como enviar los datos al servidor
    guardarDatosPerfil(nombre, email, telefono);

    popupGuardar.close();
    popupGuardar.style.display="none";
}

guardarCambios.addEventListener('click',confirmarGuardar);

function volverPerfil(){
    // El código que se ejecutará cuando se haga clic en el botón
    window.location.href = 'perfil.html';

    popupSalir.close();
    popupSalir.style.display="none";
}
function cerrarSalir(){
    popupSalir.close();
    popupSalir.style.display="none";
}

function cerrarConfirmarGuardar(){
    popupGuardar.close();
    popupGuardar.style.display="none";
}

cancelarGuardar.addEventListener('click',cerrarConfirmarGuardar);


salirEditar.addEventListener('click',volverPerfil);

cancelarSalirEditar.addEventListener('click',cerrarSalir);