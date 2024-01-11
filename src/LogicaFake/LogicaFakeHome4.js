/**
 * @brief Esta función obtiene datos desde un servidor local y los muestra en la página web.
 *
 * Esta función realiza una solicitud GET a un servidor local y muestra los datos en una página web.
 * Si la solicitud no es exitosa, se maneja un error.
 */
async function nombreUsuarioGet(emailUsuario) {
    // Buscar nombre por correo
    try {
        const respuesta = await fetch('http://192.168.1.101:3001/api/sensor/usuario', {
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

export {nombreUsuarioGet};

    async function ultimaMedidaGet(emailUsuario) {
    // Buscar ultima medida por el correo
    try {
        // Realizar una solicitud GET al servidor local
        const respuesta = await fetch('http://192.168.1.101:3001/api/sensor/medida', {
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
        console.log('Medida recibida:', datos);

        return datos;

    } catch (error) {
        console.error('Error:', error);
    }
}

export {ultimaMedidaGet};

async function ultimasMedidasOzonoConMedia(emailUsuario) {
    // Buscar ultima medida por el correo
    try {
        // Realizar una solicitud GET al servidor local
        const respuesta = await fetch('http://192.168.1.101:3001/api/sensor/8HorasMedia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ajustar los encabezados según sea necesario
            },
            body: JSON.stringify({ 'email': "fcastells@eln.upv.es" }) // Ajustar el cuerpo según sea necesario
        });

        if (!respuesta.ok) {
            throw new Error('La solicitud no fue exitosa');
        }

        // Obtener los datos en formato JSON
        const datos = await respuesta.json();
        console.log('Media recibida:', datos);

        return datos;

    } catch (error) {
        console.error('Error:', error);
    }
}

export { ultimasMedidasOzonoConMedia };


 async function medidasGet(emailUsuario) {
    // Buscar todas las medidas por el correo
    try {
        // Realizar una solicitud GET al servidor local
        const respuesta = await fetch('http://192.168.1.101:3001/api/sensor', {
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
        console.log('Medidas recibidas:', datos);

        return datos;

    } catch (error) {
        console.error('Error:', error);
    }
}

export {medidasGet};