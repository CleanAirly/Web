//Pop UP ---------------------------------------------------------------------------------------------------------------
const popupEmail = document.getElementById("popup-enviar-email");
const aceptarCambio = document.getElementById("aceptar");
popupEmail.style.display="none"

// Boton e input -------------------------------------------------------------------------------------------------------
const botonEnviar = document.getElementById('boton-enviar-email');
const emailInput = document.getElementById("emailRecuperacion");

//Importar -------------------------------------------------------------------------------------------------------------
import { emailUsuarioGet } from './LogicaFake/LogicaFakeIntroduccirEmail3.js';

botonEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    estaNoEsta();
});

async function estaNoEsta() {
    let emails = emailInput.value;
    const datosObtenidos = await emailUsuarioGet(emails);
    console.log(emails)
    for(var i = 0; i<datosObtenidos.length; i++){
        if(datosObtenidos[i].email=== emails){
            popupEmail.showModal();
            popupEmail.style.display="block";
        }
    }
}

function confirmarPopUp() {
    popupEmail.style.display = "none";
    enviarCorreo(emailInput.value)
}

aceptarCambio.addEventListener('click', confirmarPopUp);

async function enviarCorreo(destinatario) {

    try {
        await emailjs.send('service_8pcixiz', 'template_oq8l6qj', {
            to_name: 'Hola,',
            from_name: 'Te enviamos un correo desde contact.cleanairly@gmail.com para que restablezcas tu contraseña',
            message: `Hola,\n\nHas solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:\n\nhttp://localhost/PBiometriav2/src/recuperarContrasenya.html?email=${encodeURIComponent(destinatario)}\n\n¡Gracias!`,
            to_email: destinatario
        });
        alert('¡Correo enviado!');
    } catch (err) {
        alert(JSON.stringify(err));
    }
}


