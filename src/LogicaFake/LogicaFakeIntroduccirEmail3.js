/**
 * @brief Esta función obtiene datos desde un servidor local y los muestra en la página web.
 *
 * Esta función realiza una solicitud GET a un servidor local y muestra los datos en una página web.
 * Si la solicitud no es exitosa, se maneja un error.
 */
async function emailUsuarioGet() {
    // Buscar nombre por correo
    try {
        const respuesta = await fetch('http://192.168.1.57:3001/api/sensor/emailNoAdmins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ajustar los encabezados según sea necesario
            },
            body: JSON.stringify({}) // Ajustar el cuerpo según sea necesario
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