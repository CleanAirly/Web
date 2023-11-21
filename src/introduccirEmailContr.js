const botonEnviar= document.getElementById("boton-enviar-email");
const popupEnviar = document.getElementById("popup-enviar-email");
const enviado= document.getElementById("aceptar");

popupEnviar.style.display="none";

botonEnviar.addEventListener('click', () => {

    popupEnviar.showModal();
    popupEnviar.style.display="block";
})



function cerrarGuardar(){
    popupEnviar.close();
    popupEnviar.style.display="none";
}

enviado.addEventListener('click',cerrarGuardar);
guardarCambios.addEventListener('click',cerrarGuardar)