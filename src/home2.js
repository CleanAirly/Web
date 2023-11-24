const progressBarFill = document.querySelector('.progress-bar-fill');
const mostrarValor = document.getElementById("texto-informativo");
const displayBienvenida = document.getElementById('nombre-usuario');
const displayPpm = document.getElementById('texto-informativo');
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
            displayPpm.innerHTML = ultimaMedida.valor;
            setProgressBar( (ultimaMedida.valor / 1000) * 100);
            aumenta();
        } else {
            displayPpm.innerHTML = "sin datos";
        }

        let listaMedidas = await medidasGet(emailUsuario);
        if(listaMedidas !== null){
            listaMedidas.forEach( (medida) => {
                listaInstantes.push(medida.instante);
                listaValores.push(medida.valor);

                // Selecciona el elemento canvas donde se renderizará el gráfico
                const canvas = document.getElementById("miGrafico");

                // Define los datos para el gráfico
                const data = {
                    labels: listaInstantes,
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
            })
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

 function aumenta(){
     // Usamos un intervalo para realizar el aumento de manera gradual
     let progress=setInterval(()=>{
         if(start<valorCreciente){
             //para que se vea como aumenta poco a poco 
             start = start + 2;
             ProgressEND();
         }else if(start>valorCreciente){
             //para que se vea como decrece
             start--;
             ProgressEND();
         }
         function ProgressEND(){
             //hago que mi texto aumente poco a poco
             mostrarValor.textContent =`${start}ppm`
             //para que cuando llegue al valor no siga aumentando
             if(start === valorCreciente){
                 clearInterval(progress);
                 valorCreciente = "";
             }
         }
     },1)//quiero que lo haga en 15 segundos (mientras mas grande el valor en menos tiempo hay que hacerlo)
 }