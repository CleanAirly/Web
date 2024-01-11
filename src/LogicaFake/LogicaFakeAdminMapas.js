async function historicoMapas(fecha) {
    try {
        // Realizar una solicitud PUT al servidor local
        const respuesta = await fetch('http://192.168.1.47:3001/api/sensor/historicosMapa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ajustar los encabezados según sea necesario
            },
            body: JSON.stringify({date:fecha}) // Ajustar el cuerpo según sea necesario
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

export {historicoMapas};