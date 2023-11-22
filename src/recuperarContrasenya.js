const errorLabel = document.getElementById("error");
const lvlSeguridad = document.getElementById("nivel-seguridad");
const contSeg = document.getElementById("contenedor-seguridad");
const progresoSeguridad = document.getElementById("progreso-seguridad");
const btonRecuperar = document.getElementById("boton-recuperar-contrasenya");
var txtSeguridad = document.getElementById("txt-seguridad");

const emailUsuario = localStorage.getItem('usuarioLogeado');

lvlSeguridad.classList.add("hidden");
contSeg.classList.add("hidden");
progresoSeguridad.classList.add("hidden");
txtSeguridad.classList.add("hidden");
btonRecuperar.classList.remove("crecer");
btonRecuperar.disable= true;


document.getElementById("restablecer-contrasenya").addEventListener('submit',cambiarContrasenya);
document.getElementById("restablecer-contrasenya").addEventListener('input',seguridadContrasenya);

import { obtenerDatosUsuario } from './LogicaFake/LogicaFakePerfil.js';

obtenerDatosUsuario(emailUsuario)
    .then(resultado => {
        console.log(resultado)
    })
    .catch((error) => {
        console.error('Error en la promesa:', error);
    });

async function cambiarContrasenya(event){
    event.preventDefault();
    var nuevaContrasenya = document.getElementById("nuevaContrasenya").value;
    var confNuevaContrasenya = document.getElementById("confNuevaContrasenya").value;
    if(nuevaContrasenya !== confNuevaContrasenya){
        errorLabel.classList.remove("hidden");
    }else{
        errorLabel.classList.add("hidden");
    }
}
function seguridadContrasenya(){
    var nuevaContrasenya = document.getElementById("nuevaContrasenya").value;

    lvlSeguridad.classList.remove("hidden");
    contSeg.classList.remove("hidden");
    progresoSeguridad.classList.remove("hidden");
    txtSeguridad.classList.remove("hidden");

    const tieneLetras = /[a-zA-Z]/.test(nuevaContrasenya);
    const tieneNumeros = /[0-9]/.test(nuevaContrasenya);
    const tieneMayusculas = /[A-Z]/.test(nuevaContrasenya);

    let porcentaje = 0;

    if(nuevaContrasenya.length==0){
        porcentaje= 0
        txtSeguridad.textContent="Tu contraseña debe tener al menos 8 carácteres";
        botonDeshabilitado();
    }
    else if (tieneLetras && !tieneNumeros && !tieneMayusculas || !tieneLetras && tieneNumeros && !tieneMayusculas || !tieneLetras && !tieneNumeros && tieneMayusculas|| nuevaContrasenya.length<8) {
        porcentaje = 20;
        txtSeguridad.textContent="Tu contraseña debe tener al menos 8 carácteres";
        progresoSeguridad.style.backgroundColor= "var(--txt-error)";
        botonDeshabilitado();

    }else if(tieneLetras && !tieneNumeros && !tieneMayusculas && nuevaContrasenya.length>=8|| !tieneLetras && tieneNumeros && !tieneMayusculas && nuevaContrasenya.length>=8 || !tieneLetras && !tieneNumeros && tieneMayusculas && nuevaContrasenya.length>=8 ){
        porcentaje = 20;
        txtSeguridad.textContent="Tu contraseña es poco segura";
        progresoSeguridad.style.backgroundColor= "var(--txt-error)";
        botonDeshabilitado();
    }
    else if (tieneLetras && tieneNumeros && !tieneMayusculas && nuevaContrasenya.length>=8|| !tieneLetras && tieneNumeros && tieneMayusculas && nuevaContrasenya.length>=8 || tieneLetras && !tieneNumeros && tieneMayusculas && nuevaContrasenya.length>=8) {
        porcentaje = 50;
        txtSeguridad.textContent="Tu contraseña es segura";
        progresoSeguridad.style.backgroundColor= "var(--intermedio)";
        botonHabilitado();
        

    } else if (tieneLetras && tieneNumeros && tieneMayusculas && nuevaContrasenya.length>=8) {
        porcentaje = 100;
        txtSeguridad.textContent="Tu contraseña es muy segura";
        progresoSeguridad.style.backgroundColor= "var(--bien)";
        botonHabilitado();
    }

    progresoSeguridad.style.width = porcentaje + "%";
}

function botonDeshabilitado(){
    btonRecuperar.disable=true;
    btonRecuperar.classList.add("boton-blanco");
    btonRecuperar.classList.remove("boton-azul");
    btonRecuperar.classList.remove("crecer");
}

function botonHabilitado(){
    btonRecuperar.disable=false;
    btonRecuperar.classList.add("boton-azul");
    btonRecuperar.classList.remove("boton-blanco");
    btonRecuperar.classList.add("crecer");
}


