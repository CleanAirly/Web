import {historicoMapas} from "./LogicaFake/LogicaFakeAdminMapas.js";

const selector = document.getElementById("selector")

let datos = [];
let map;
let marcadores;

selector.addEventListener("change", async () => {
    marcadores.clearLayers();
    await cargarMedidasEnMapa(selector.value, datos)
});

(async () => {
    await crearMapa()
    datos = await obtenerMedicionesEnIntervaloFecha(new Date('2023-10-27'))
    datos.forEach(elemento => {
        const opcion = document.createElement("option");
        opcion.value = elemento.fecha;
        opcion.text = elemento.fecha;
        selector.add(opcion);
    })
})();

async function obtenerMedicionesEnIntervaloFecha(medicionInicial){
    const fechaActual = new Date()
    //const fechaInicial = new Date(medicionInicial.instante)
    const fechaInicial = new Date(medicionInicial)
    const milisegundosEnUnDia = 24 * 60 * 60 * 1000;

    let diferenciaMilisegundos = fechaActual - fechaInicial;
    const diasTranscurridos = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    let datosRaw = []
    let fechaDiasTranscurridos = fechaInicial
    for(let i = 0; i < diasTranscurridos; i++){
        let fechaConvertida = convertirFormatoFecha(fechaDiasTranscurridos)
        let objetoDato = {
            fecha: fechaConvertida,
            valores: await historicoMapas(fechaConvertida.toString())
        }
        datosRaw.push(objetoDato)

        let tiempoMilis = fechaDiasTranscurridos.getTime()+milisegundosEnUnDia
        fechaDiasTranscurridos = new Date(tiempoMilis)
    }
    /*let datosFiltrados = datosRaw.filter( (datos) => {
        if(datos.valores.length !== 0){
            return datos
        }
    })*/

    return datosRaw
}

function convertirFormatoFecha(fechaOriginal) {
    // Extraer componentes de la fecha
    let year = fechaOriginal.getFullYear();
    let month = ('0' + (fechaOriginal.getMonth() + 1)).slice(-2);  // Añadir cero al mes si es necesario
    let day = ('0' + fechaOriginal.getDate()).slice(-2);  // Añadir cero al día si es necesario

    // Construir la nueva fecha en el formato deseado
    return year + '-' + month + '-' + day;
}

async function crearMapa(){
    // MAPA
    // Coordenadas de Gandía, España
    let gandiaCoordinates = [38.998381834680494, -0.16255835233492064];

    // Crea el mapa centrado en Gandía
    map = L.map('map', {
        center: gandiaCoordinates,
        zoom: 10,
        //maxBounds: L.latLngBounds([38.5, -0.5], [39.5, 0.5]), // Ajusta los límites según la zona de Gandía
    });

    // Añade una capa de OpenStreetMap al mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    marcadores = L.layerGroup().addTo(map);
}

async function cargarMedidasEnMapa(fecha, datos){
    let listaDatosDia = [];

    datos.forEach(medida => {
        if(medida.fecha === fecha){
            listaDatosDia = medida.valores
        }
    });

    listaDatosDia.forEach(dato => {
        console.log(dato)
        let lugarMedida = dato.lugar.split(",");
        L.marker([lugarMedida[0], lugarMedida[1]]).addTo(map).bindPopup('Valor: ' + dato.valor.toFixed(2)).addTo(marcadores);
    })
}