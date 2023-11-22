/**
 * @brief Esta función obtiene datos desde un servidor local y los muestra en la página web.
 *
 * Esta función realiza una solicitud GET a un servidor local y muestra los datos en una página web.
 * Si la solicitud no es exitosa, se maneja un error.
 */
async function cambiarContrasenya(email, contrasenya) {
    try {
        // Realizar una solicitud PUT al servidor local
        const respuesta = await fetch('http://192.168.1.57:3001/api/sensor/cambiarPassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Ajustar los encabezados según sea necesario
            },
            body: JSON.stringify({email:email, contraseña:contrasenya}) // Ajustar el cuerpo según sea necesario
        });

        if (!respuesta.ok) {
            throw new Error('La solicitud no fue exitosa');
        }

        // Obtener los datos en formato JSON
        const datos = await respuesta.json();
        console.log('Datos recibidos desde el servidor local:', datos);
        window.location.href = 'perfil.html';
    } catch (error) {
        console.error('Error:', error);
    }
}

export {cambiarContrasenya};

async function comprobarContrasenya(email) {
    try {
        // Realizar una solicitud PUT al servidor local
        const respuesta = await fetch('http://192.168.1.57:3001/api/sensor/comprobarPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ajustar los encabezados según sea necesario
            },
            body: JSON.stringify({email:email}) // Ajustar el cuerpo según sea necesario
        });

        if (!respuesta.ok) {
            throw new Error('La solicitud no fue exitosa');
        }

        // Obtener los datos en formato JSON
        const datos = await respuesta.json();
        console.log('Datos recibidos desde el servidor local:', datos);
    } catch (error) {
        console.error('Error:', error);
    }
}

export {comprobarContrasenya};

const emailUsuario = localStorage.getItem('usuarioLogeado');
comprobarContrasenya(emailUsuario)


