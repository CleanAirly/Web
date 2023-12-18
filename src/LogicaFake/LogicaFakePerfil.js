/*
 * @brief Esta función obtiene datos desde un servidor local y los muestra en la página web.
 * 
 * Esta función realiza una solicitud GET a un servidor local y muestra los datos en una página web.
 * Si la solicitud no es exitosa, se maneja un error.
 */
async function obtenerDatosUsuario(emailUsuario) {
    try {
        // Realizar una solicitud GET al servidor local
        const respuesta = await fetch('http://172.20.10.2:3001/api/sensor/usuario', {
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
export {obtenerDatosUsuario};

async function inactividadSensor(email){
    try {
        let respuesta = await fetch('http://172.20.10.2:3001/api/sensor/inactividadSensor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        });
        const datos = await respuesta.json();
        console.log('Datos recibidos desde el servidor local:', datos);
        return datos;

    } catch (error) {
        console.error('Error:', error);
    }
}

export {inactividadSensor};