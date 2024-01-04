const botonGuardarEditar= document.getElementById("editar-perfil-admin");
const popupGuardar = document.getElementById("popup-guardar-cambios");
const guardarCambios= document.getElementById("guardar-cambios");
const cancelarGuardar= document.getElementById("cancelar-guardar");

const botonSalirEditar = document.getElementById("cancelar-editar-perfil-admin");
const popupSalir = document.getElementById("popup-cancelar-cambios");
const salirEditar= document.getElementById("aceptar-salir");
const cancelarSalirEditar= document.getElementById("cancelar-salir");

const inputNombre = document.getElementById("nombreUsuario");
const inputTelefono = document.getElementById("telefonoUsuario");

// CERRAR SESION -------------------------------------------------------------------------------------------------------
const botonCerrarSesion = document.getElementById("cerrar-sesion");
const popupCerrarSesion = document.getElementById("popup-cerrar-sesion");
const aceptarCerrarSesion = document.getElementById("aceptar-cerrar");
const cancelarCerrarSesion = document.getElementById("cancelar-cerrar")

botonCerrarSesion.addEventListener('click', () => {
    popupCerrarSesion.showModal();
    popupCerrarSesion.style.display="block";
})

// ACEPTAR
function realizarCierreDeSesion(){
    localStorage.removeItem('usuarioLogeado');
    localStorage.removeItem('usuarioRole');
    location.href = 'index.html';
    popupCerrarSesion.close();
    popupCerrarSesion.style.display="none";
}

// CANCELAR
function cerrarSalir() {
    popupCerrarSesion.close();
    popupCerrarSesion.style.display="none";
}

aceptarCerrarSesion.addEventListener('click', realizarCierreDeSesion);
cancelarCerrarSesion.addEventListener('click', cerrarSalir);

// POPUP GUARDAR CAMBIOS -----------------------------------------------------------------------------------------------
botonGuardarEditar.addEventListener('click', (event) => {
    event.preventDefault();
    popupGuardar.showModal();
    popupGuardar.style.display="block";
})

// ACEPTAR
async function aceptarGuardar() {
    popupGuardar.close();
    popupGuardar.style.display = "none";

    console.log(inputNombre.value)
    console.log(inputTelefono.value)

    if (document.getElementById("nombreUsuario").value === localStorage.getItem('nombreUsuarioEditar') && document.getElementById("telefonoUsuario").value === localStorage.getItem('telefonoUsuarioEditar')) {
        location.href = 'admin.html';
    } else {
        let respuesta = await guardarDatosPerfil(document.getElementById("nombreUsuario").value, localStorage.getItem('emailUsuarioEditar'), document.getElementById("telefonoUsuario").value);
        if(respuesta === true){
            location.href = 'admin.html';
        } else {
            console.log("Error: "+respuesta)
            location.href = 'admin.html';
        }
    }
}

// CANCELAR
function cerrarGuardar(){
    popupGuardar.close();
    popupGuardar.style.display="none";
}

cancelarGuardar.addEventListener('click',cerrarGuardar);
guardarCambios.addEventListener('click',aceptarGuardar);

// POPUP CANCELAR ------------------------------------------------------------------------------------------------------
botonSalirEditar.addEventListener('click', () => {
    popupSalir.showModal();
    popupSalir.style.display="block";
})

// ACEPTAR
function aceptarCancelarEditar(){
    popupSalir.close();
    popupSalir.style.display="none";
    location.href = 'admin.html'
}

// CANCELAR
function cancelarCancelarEditar(){
    popupSalir.close();
    popupSalir.style.display="none";
}
salirEditar.addEventListener('click',aceptarCancelarEditar);
cancelarSalirEditar.addEventListener('click',cancelarCancelarEditar);

// FUNCIÓN AUTOINVOCADA AL SOLICITAR LA PAGINA -------------------------------------------------------------------------
(async () => {
    popupCerrarSesion.style.display="none";
    popupGuardar.style.display="none";
    popupSalir.style.display="none";

    // VERIFICAR QUE EL USUARIO QUE HA ENTRADO A LA PAGINA ES ADMIN
    if(localStorage.getItem('usuarioRole') === null || localStorage.getItem('usuarioRole') === "usuario"){
        location.href = 'index.html'
    } else {
        // VISIBILIZO LA PAGINA
        document.body.classList.remove("noVisible");

        // MUESTRO LOS DATOS DEL USUARIO EN SU CORRESPONDIENTE LUGAR
        document.getElementById("titutlo").innerHTML = "Datos del usuario<br>"+localStorage.getItem('emailUsuarioEditar');
        document.getElementById("nombreUsuario").value = localStorage.getItem('nombreUsuarioEditar');
        document.getElementById("telefonoUsuario").value = localStorage.getItem('telefonoUsuarioEditar');
        //document.getElementById("sensorUsuario").value = localStorage.getItem('sensorUsuarioEditar');
        document.getElementById("nombreUsuario").placeholder = "Actual: "+localStorage.getItem('nombreUsuarioEditar');
        document.getElementById("telefonoUsuario").placeholder = "Actual: "+localStorage.getItem('telefonoUsuarioEditar');
    }
})();

// FUNCION PARA GUARDAR LOS CAMBIOS ------------------------------------------------------------------------------------
async function guardarDatosPerfil(nombre, email, telefono) {
    try {
        // Realizar una solicitud PUT al servidor local
        const respuesta = await fetch('http://192.168.43.64:3001/api/sensor/usuarioUpdate', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Ajustar los encabezados según sea necesario
            },
            body: JSON.stringify({nombre:nombre, email:email, telefono:telefono}) // Ajustar el cuerpo según sea necesario
        });
        return await respuesta.json();
    } catch (e) {
        console.error('Error: ', e);
    }
}