const botonGuardarEditar= document.getElementById("editar-perfil-admin");
const popupGuardar = document.getElementById("popup-guardar-cambios");
const guardarCambios= document.getElementById("guardar-cambios");
const cancelarGuardar= document.getElementById("cancelar-guardar");

const botonSalirEditar = document.getElementById("cancelar-editar-perfil-admin");
const popupSalir = document.getElementById("popup-cancelar-cambios");
const salirEditar= document.getElementById("aceptar-salir");
const cancelarSalirEditar= document.getElementById("cancelar-salir");

popupGuardar.style.display="none";
popupSalir.style.display="none";


// POPUP GUARDAR CAMBIOS -----------------------------------------------------------------------------------------------
botonGuardarEditar.addEventListener('submit', () => {
    popupGuardar.showModal();
    popupGuardar.style.display="block";
})

// ACEPTAR
function aceptarGuardar(){
    popupGuardar.close();
    popupGuardar.style.display="none";

    // LLAMAR A LA LOGICA PARA GUARDAR LOS CAMBIOS
}

// CANCELAR
function cerrarGuardar(){
    popupGuardar.close();
    popupGuardar.style.display="none";
}

cancelarGuardar.addEventListener('click',cerrarGuardar);
guardarCambios.addEventListener('click',cerrarGuardar);

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
        document.getElementById("sensorUsuario").value = localStorage.getItem('sensorUsuarioEditar');
    }
})();