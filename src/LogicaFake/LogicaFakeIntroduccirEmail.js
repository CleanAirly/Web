/**
 * @brief Esta función obtiene datos desde un servidor local y los muestra en la página web.
 *
 * Esta función realiza una solicitud GET a un servidor local y muestra los datos en una página web.
 * Si la solicitud no es exitosa, se maneja un error.
 */
async function emailUsuarioGet(emailUsuario) {
    // Buscar nombre por correo
    try {
        const respuesta = await fetch('http://192.168.1.57:3001/api/sensor/emailNoAdmins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ajustar los encabezados según sea necesario
            },
            body: JSON.stringify({'email':emailUsuario}) // Ajustar el cuerpo según sea necesario
        });

        if (!respuesta.ok) {
            throw new Error('La solicitud no fue exitosa');
        }

        // Obtener los datos en formato JSON
        const datos = await respuesta.json();
        console.log('Datos recibidos desde el servidor local:', datos);

        return datos;
    } catch (error) {
        console.error('Error:', error);
    }
}

export {emailUsuarioGet};

const boton = document.getElementById('boton-enviar-email');
const emailInput = document.getElementById("emailRecuperacion");
let datos = []; // Cambié const por let para poder modificar el array

boton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("AAAAAAA");
    estaNoEsta();
});

async function testEmailUsuarioGet() {
    try {
        const email = 'correo@ejemplo.com';
        const datosObtenidos = await emailUsuarioGet(email);
        datos = datosObtenidos; // Actualizar datos con la respuesta obtenida
        console.log('Datos obtenidos:', datos);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

// Llamada a la función de prueba
testEmailUsuarioGet();

async function estaNoEsta() {
    let emails = emailInput.value;
    const datosObtenidos = await emailUsuarioGet(emails);
    console.log(emails)
    console.log(datosObtenidos)
    console.log(datosObtenidos.length)
    for(var i = 0; i<datosObtenidos.length; i++){
        if(datosObtenidos[i].email== emails){
            console.log("FUNCIONA")
        }
    }
}
