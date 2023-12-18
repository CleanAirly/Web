const progressBarFill = document.querySelector('.progress-bar-fill');
var mostrarValor = document.getElementById("texto-informativo");
const displayBienvenida = document.getElementById('nombre-usuario');


let listaInstantes = [];
let listaValores = [];

import { nombreUsuarioGet } from './LogicaFake/LogicaFakeHome4.js';
import { ultimaMedidaGet } from './LogicaFake/LogicaFakeHome4.js';
import { medidasGet } from './LogicaFake/LogicaFakeHome4.js';

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
        if(ultimaMedida !== null){
            mostrarValor.textContent = ultimaMedida.valor + " ppm";
            setProgressBar( (ultimaMedida.valor / 1000) * 100);
            var nivelRespirado = document.getElementById("nivel-respirado");
            if(ultimaMedida.valor<=50){
                nivelRespirado.innerHTML = "Muy bueno"
            }
            if(ultimaMedida.valor>50 && ultimaMedida.valor<=100){
                nivelRespirado.innerHTML = "Bueno"
            }
            if(ultimaMedida.valor>100 && ultimaMedida.valor<=150){
                nivelRespirado.innerHTML = "Aceptable"
            }
            if(ultimaMedida.valor>150 && ultimaMedida.valor<=200){
                nivelRespirado.innerHTML = "Malo"
            }
            if(ultimaMedida.valor>200){
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

let RUTA = 'http://172.20.10.2:3001/api/sensor';

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
