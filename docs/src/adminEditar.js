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

botonGuardarEditar.addEventListener('click', () => {

    popupGuardar.showModal();
    popupGuardar.style.display="block";
})

botonSalirEditar.addEventListener('click', () => {
    popupSalir.showModal();
    popupSalir.style.display="block";
})


function cerrarGuardar(){
    popupGuardar.close();
    popupGuardar.style.display="none";
}

function cerrarSalir(){
    popupSalir.close();
    popupSalir.style.display="none";
}

cancelarGuardar.addEventListener('click',cerrarGuardar);
guardarCambios.addEventListener('click',cerrarGuardar);

salirEditar.addEventListener('click',cerrarSalir);
cancelarSalirEditar.addEventListener('click',cerrarSalir);