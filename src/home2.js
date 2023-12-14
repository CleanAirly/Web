const progressBarFill = document.querySelector('.progress-bar-fill');
var mostrarValor = document.getElementById("texto-informativo");
const displayBienvenida = document.getElementById('nombre-usuario');

let valorCreciente =50;
let start= 0;
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

// Crear un array con objetos {lat, lng, value} para Leaflet.heat, usando los valores individuales
let listaMedidas = await medidasGet("prueba@gmail.com");
var heatData = listaMedidas.map(medida => ({
    lat: parseFloat(medida.lugar.split(",")[0]),
    lng: parseFloat(medida.lugar.split(",")[1]),
    value: medida.valor  // Usar directamente el valor individual
}));

// Crear una capa de calor y añadirla al mapa
var heat = L.heatLayer(heatData, {
    radius: 25, // Radio de dispersión
    blur: 15, // Difuminado
    gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }, // Gradiente de colores
    maxZoom: 17, // Zoom máximo para mostrar el mapa de calor
    minOpacity: 0.5 // Opacidad mínima
}).addTo(map);
                    
/*
                        listaMedidas.forEach( (medida) => {
                           let valor = medida.valor;
                           let lugar = medida.lugar;
                            let arrayCoordenadas = lugar.split(","); // Dividir el string en un array usando la coma como separador
                            let latitud = arrayCoordenadas[0]; // La latitud estará en la primera posición del array
                            let longitud = arrayCoordenadas[1]; // La longitud estará en la segunda posición del array

                            var circle = L.circle([latitud,longitud], {
                                color: 'blue',
                                fillColor: 'blue',
                                fillOpacity: 0.5,
                                radius: 50 // Radio en metros
                            }).addTo(map);

                            circle.bindPopup("Contaminación:"+ valor +"ppm de ozono").openPopup(); // Popup con información de contaminación
                           
                        });
                           
                           
                    */
                                        
                                
                                
            }

        /*medidasGet(emailUsuario)
            .then((resultado) => {
                console.log(resultado);
                resultado.forEach(function(elemento) {
                    listaInstantes.push(elemento.instante);
                    listaValores.push(elemento.valor);
                });





            })
            .catch((error) => {
                console.error('Error en la promesa:', error);
            });*/
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

 