const btnEnviar = document.getElementById("boton-enviar-correo");
const ckbox = document.getElementById("privacidad");

btnEnviar.addEventListener('click', async (event) => {
    event.preventDefault();

    const nombreUsuario = document.getElementById("nombre-usuario").value;
    const correoUsuario = document.getElementById("correo-usuario").value;
    const telefonoUsuario = document.getElementById("telefono-usuario").value;

    if (ckbox.checked) {
        await enviarCorreo(nombreUsuario, correoUsuario, telefonoUsuario);
    } else {
        alert("Debes aceptar los términos y condiciones de privacidad.");
    }
});

async function enviarCorreo(usuario, correo, telefono) {
    try {
        await emailjs.send('service_8pcixiz', 'template_ax6rpnf', {
            to_name: 'Equipo de la empresa',
            from_name: usuario + ' quiere ponerse en contacto',
            message: `Hola,\n\nEl usuario ${usuario} con correo ${correo} y teléfono ${telefono} quiere ponerse en contacto.\n\n¡Gracias!`,
        });
        alert('¡Correo enviado!');
    } catch (err) {
        alert(JSON.stringify(err));
    }
}