const progressBarFill = document.querySelector('.progress-bar-fill');
var mostrarValor = document.getElementById("texto-informativo");
const displayBienvenida = document.getElementById('nombre-usuario');

let RUTA = 'http://192.168.1.101:3001/api/sensor';

let listaInstantes = [];
let listaValores = [];

import { nombreUsuarioGet } from './LogicaFake/LogicaFakeHome4.js';
import { ultimaMedidaGet } from './LogicaFake/LogicaFakeHome4.js';
import { medidasGet } from './LogicaFake/LogicaFakeHome4.js';
import { ultimasMedidasOzonoConMedia } from './LogicaFake/LogicaFakeHome4.js';

(async () => {
    if(localStorage.getItem('usuarioRole') !== "usuario"){
        location.href = 'index.html'
    } else {
        document.body.classList.remove("hidden");

        const emailUsuario = localStorage.getItem('usuarioLogeado');

        let datosUsuario = await nombreUsuarioGet(emailUsuario);
        if(datosUsuario !== null){
            displayBienvenida.innerHTML = "¡Hola, "+datosUsuario.nombre+"!";
            nombreUsuarioGet(emailUsuario).then()
        }

        let ultimaMedida = await ultimaMedidaGet(emailUsuario);
        let mediaUltimas8Horas = await ultimasMedidasOzonoConMedia(emailUsuario);

        if(ultimaMedida !== null){
            mostrarValor.textContent = ultimaMedida.valor + " ppm";
            setProgressBar( (ultimaMedida.valor / 1000) * 100);
            var nivelRespirado = document.getElementById("nivel-respirado");
            if (mediaUltimas8Horas.media <=50){
                nivelRespirado.innerHTML = "Muy bueno"
            }
            if (mediaUltimas8Horas.media > 50 && mediaUltimas8Horas.media <=100){
                nivelRespirado.innerHTML = "Bueno"
            }
            if (mediaUltimas8Horas.media > 100 && mediaUltimas8Horas.media <=150){
                nivelRespirado.innerHTML = "Aceptable"
            }
            if (mediaUltimas8Horas.media > 150 && mediaUltimas8Horas.media <=200){
                nivelRespirado.innerHTML = "Malo"
            }
            if (mediaUltimas8Horas.media >200){
                nivelRespirado.innerHTML = "Peligroso"
            }
        } else {
            mostrarValor.textContent = "sin datos";
        }

        let listaMedidasGraf = await medidasGet(emailUsuario);
        if(listaMedidasGraf !== null){
            listaMedidasGraf.forEach( (medida) => {
                listaInstantes.push(medida.instante);
                listaValores.push(medida.valor);
            })

            var listafechas = [];
            //convertir lista de instantes a formato legible
            listaInstantes.forEach( (instante) => {
                let fecha = new Date(instante);
                let dia = fecha.getDate();
                let mes = fecha.getMonth();
                let anio = fecha.getFullYear();
                let hora = fecha.getHours();
                let minutos = fecha.getMinutes();
                let segundos = fecha.getSeconds();
                let fechaLegible = hora+":"+minutos;
                listafechas.push(fechaLegible);
            })
                // Selecciona el elemento canvas donde se renderizará el gráfico
                const canvas = document.getElementById("miGrafico");

                // Define los datos para el gráfico
                const data = {
                    labels: listafechas,
                    datasets: [{
                        label: "",
                        data: listaValores, // Datos de ventas para cada mes
                        borderColor: '#C5D6F8',  // Color de la línea
                        fill: false  // No rellenar el área bajo la línea
                    }]
                };

                // Configuración del gráfico
                const config = {
                    type: "line",  // Tipo de gráfico
                    data: data,
                    options: {
                        scales: {
                            x: {
                                grid: {
                                    display: false // Desactiva las líneas verticales del eje x
                                }
                            },
                            y: {
                                grid: {
                                    display: true // Desactiva las líneas horizontales del eje y
                                }
                            }
                        },
                        legend: {
                            display: false, // Desactiva la leyenda completa (texto y cuadraditos)
                        }
                    }
                };

                // Crear el objeto del gráfico
                const miGrafico = new Chart(canvas, config);

                // Ocultar la leyenda después de que se haya creado el gráfico
                miGrafico.options.plugins.legend.display = false;
                miGrafico.update();


                // MAPA 
                // Coordenadas de Gandía, España
                var gandiaCoordinates = [38.9656, -0.1845];
                        
                // Crea el mapa centrado en Gandía
                var map = L.map('map', {
                    center: gandiaCoordinates,
                    zoom: 10,
                    maxBounds: L.latLngBounds([38.5, -0.5], [39.5, 0.5]), // Ajusta los límites según la zona de Gandía
                });

                // Añade una capa de OpenStreetMap al mapa
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);
                // Crear un marcador en las coordenadas específicas
                let marker = L.marker([38.9679774, -0.1910988]).addTo(map);

                // Establecer el texto del marcador como "Estacion Oficial Gandia"
                marker.bindPopup("Estacion Oficial").openPopup();


                let listaMedidas = [];
                let medidaOficial = {lugar: "38.9679774,-0.1910988", valor: 63}
                listaMedidas.push(medidaOficial);
                try {
                    let emailUsuarios = await emailNoAdmins();
                
                    for (const email of emailUsuarios) {
                        const resultado = await medidasGet(email.email);
                        
                        resultado.forEach(function (elemento) {
                            listaMedidas.push(elemento);
                        });
                    }
                
                    
                } catch (error) {
                    console.error('Error en la ejecución:', error);
                }
                
                console.log(listaMedidas);
                
                    
        
                    // Lista de 500 valores ficticios centrados en Gandía para mayor densidad
                    var data2 = [];
        

                    listaMedidas.forEach(medida => {
                        const lugarValues = medida.lugar.split(",");
                        if (lugarValues.length === 2 && !isNaN(parseFloat(lugarValues[0])) && !isNaN(parseFloat(lugarValues[1]))) {
                        var lat = lugarValues[0]  // Latitud  
                        var lon = lugarValues[1]  // Longitud
                        var value = medida.valor  // Valor
                        data2.push([lat, lon, value]);
                        }
                    });

                    console.log("DATA: ",data2);
                    /*
                    // Genera 500 puntos ficticios
                    for (var i = 0; i < 50; i++) {
                        var lat = gandiaCoordinates[0] + (Math.random() - 0.5) * 0.1;  // Latitud
                        var lon = gandiaCoordinates[1] + (Math.random() - 0.5) * 0.1;  // Longitud
                        var value = Math.random() * 100;  // Valor
        
                        data2.push([lat, lon, value]);
                    }
        */
                    // Utiliza Leaflet-IDW para realizar la interpolación con mayor resolución
                    var idwLayer = L.idwLayer(data2, {
                        opacity: 0.7,
                        maxZoom: 18,
                        cellSize: 10,  // Celda más pequeña para mayor resolución
                        exp: 2,
                        max: 100
                    }).addTo(map);
        
                    // Añade marcadores en el mapa para cada punto
                    data2.forEach(function (point) {
                        L.marker([point[0], point[1]]).addTo(map)
                            .bindPopup('Valor: ' + point[2].toFixed(2));  // Redondea el valor a dos decimales
                    });
                    
                    /*
                    // Añade una leyenda de colores utilizando D3.js
                    var legend = L.control({ position: 'bottomright' });
        
                    legend.onAdd = function (map) {
                        var div = L.DomUtil.create('div', 'info legend');
                        var grades = [0, 33, 66, 100];
                        var labels = ['0-33', '34-66', '67-100'];
        
                        for (var i = 0; i < grades.length; i++) {
                            div.innerHTML +=
                                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                                labels[i] + '<br>';
                        }
        
                        return div;
                    };
        
                    legend.addTo(map);
        
                    // Función para obtener el color según el valor
                    function getColor(value) {
                         if (value <= 33) {
                            return 'green';
                        } else if (value <= 66) {
                            return 'orange';
                        } else {
                            return 'red';
                        }
                    }
        */
                    
              
                /*
                var mapContainer = document.getElementById('map-container');
                var map = L.map(mapContainer).setView([38.968, -0.185], 13);
                
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

// Crear un marcador en las coordenadas específicas
let marker = L.marker([38.9679774, -0.1910988]).addTo(map);

// Establecer el texto del marcador como "Estacion Oficial Gandia"
marker.bindPopup("Estacion Oficial").openPopup();


                let listaMedidas = [];
                let medidaOficial = {lugar: "38.9679774,-0.1910988", valor: 63}
                listaMedidas.push(medidaOficial);
                try {
                    let emailUsuarios = await emailNoAdmins();
                
                    for (const email of emailUsuarios) {
                        const resultado = await medidasGet(email.email);
                        
                        resultado.forEach(function (elemento) {
                            listaMedidas.push(elemento);
                        });
                    }
                
                    
                } catch (error) {
                    console.error('Error en la ejecución:', error);
                }
                
                console.log(listaMedidas);


                var heatData = listaMedidas.map(medida => {
                    const lugarValues = medida.lugar.split(",");
                    if (lugarValues.length === 2 && !isNaN(parseFloat(lugarValues[0])) && !isNaN(parseFloat(lugarValues[1]))) {
                        return {
                            lat: parseFloat(lugarValues[0]),
                            lng: parseFloat(lugarValues[1]),
                            value: medida.valor
                        };
                    }
                    // If the lugar doesn't have both lat and lng or they are not valid numbers, return null or an empty object
                    // You might handle this case based on your requirements.
                    return null; // or return {} or any default value you prefer
                }).filter(Boolean);
let seleccion;
let heat = null; // Inicializa la variable de la capa de calor como null

document.getElementById("selectorContaminantes").addEventListener("change", function() {
    seleccion = this.value;
    console.log("La selección: " + seleccion);

    if (seleccion === "ozono") {
        // Si se selecciona "ozono", mostrar el mapa de calor
        if (!heat) {
            heat = L.heatLayer(heatData, {
                radius: 25,
                blur: 15,
                gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' },
                maxZoom: 17,
                minOpacity: 0.5
            }).addTo(map);
        }
    } else {
        // Si se selecciona cualquier otro contaminante y la capa de calor existe, eliminarla del mapa
        if (heat) {
            map.removeLayer(heat);
            heat = null; // Establece la variable de la capa de calor como null después de eliminarla
        }
        // Aquí podrías manejar otras acciones cuando no hay medidas disponibles para otro contaminante
    }
});

// Al iniciar, si por defecto está seleccionado "ozono", muestra la capa de calor
seleccion = document.getElementById("selectorContaminantes").value;
if (seleccion === "ozono") {
    heat = L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' },
        maxZoom: 17,
        minOpacity: 0.5
    }).addTo(map);
    }
*/
    }
}
    
})();

function setProgressBar(progress) {
    const totalLength = 596.9; 
    const dashoffset = totalLength - (progress / 100) * totalLength;
    if (progress <= 30) {
        progressBarFill.setAttribute('stroke', 'var(--botones)');
    } else if (progress > 30 && progress < 70) {
        progressBarFill.setAttribute('stroke', '#d6c918');
    } else {
        progressBarFill.setAttribute('stroke', 'var(--txt-error)');
    }
    progressBarFill.style.strokeDashoffset = dashoffset;
}

 // FUNCIÓN PARA OBTENER TODOS LOS EMAILS DE USUARIOS QUE NO SEA ADMINISTRADORES ----------------------------------------
 async function emailNoAdmins(){
    try{
        let respuesta = await fetch(RUTA+'/emailNoAdmins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        return await respuesta.json()
    } catch (e) {
        console.log("Error: "+e);
    }
}
