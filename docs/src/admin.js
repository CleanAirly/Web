const botonBorrarUsuario = document.getElementById("boton-borrar");
const popupBorrar = document.getElementById("popup-borrar-usuario");
const cancelarBorrar= document.getElementById("cancelar-borrar");
const aceptarError= document.getElementById("aceptar-borrar");

popupBorrar.style.display="none";

botonBorrarUsuario.addEventListener('click', () => {
    popupBorrar.showModal();
    popupBorrar.style.display="block";
})

function cerrarPopUP(){
    popupBorrar.close();
    popupBorrar.style.display="none";
}

function borrarUsuario(){
    popupBorrar.close();
    popupBorrar.style.display="none";
}

cancelarBorrar.addEventListener('click',cerrarPopUP);
aceptarError.addEventListener('click',borrarUsuario);

