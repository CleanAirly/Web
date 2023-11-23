//Pop UP ---------------------------------------------------------------------------------------------------------------
const popupEmail = document.getElementById("popup-enviar-email");
const aceptarCambio = document.getElementById("aceptar");
popupEmail.style.display="none"

// Boton e input -------------------------------------------------------------------------------------------------------
const botonEnviar = document.getElementById('boton-enviar-email');
const emailInput = document.getElementById("emailRecuperacion");

//Importar -------------------------------------------------------------------------------------------------------------
import { emailUsuarioGet } from './LogicaFake/LogicaFakeIntroduccirEmail2.js';
botonEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    estaNoEsta();
});

async function estaNoEsta() {
    let emails = emailInput.value;
    const datosObtenidos = await emailUsuarioGet(emails);
    console.log(emails)
    console.log(datosObtenidos)
    console.log(datosObtenidos.length)
    for(var i = 0; i<datosObtenidos.length; i++){
        if(datosObtenidos[i].email== emails){
            popupEmail.showModal();
            popupEmail.style.display="block";
        }
    }
}

function confirmarPopUp() {
    popupEmail.style.display = "none";
    const emails = emailInput.value;
    window.location.href = `recuperarContrasenya.html?email=${encodeURIComponent(emails)}`;
}

aceptarCambio.addEventListener('click', confirmarPopUp);
