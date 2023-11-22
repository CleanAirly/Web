const errorLabel = document.getElementById("error");
const lvlSeguridad = document.getElementById("nivel-seguridad");
const contSeg = document.getElementById("contenedor-seguridad");
const progresoSeguridad = document.getElementById("progreso-seguridad");
const btonRecuperar = document.getElementById("boton-recuperar-contrasenya");
var txtSeguridad = document.getElementById("txt-seguridad");

const inputContrasenyaActual = document.getElementById("contrasenyaAnterior");
const inputnuevaContrasenya = document.getElementById("nuevaContrasenya");
const inputconfContrasenya = document.getElementById("confNuevaContrasenya");

lvlSeguridad.classList.add("hidden");
contSeg.classList.add("hidden");
progresoSeguridad.classList.add("hidden");
txtSeguridad.classList.add("hidden");
btonRecuperar.classList.remove("crecer");
btonRecuperar.disable= true;

const emailUsuario = localStorage.getItem('usuarioLogeado');
console.log(emailUsuario)

import { comprobarContrasenya } from './LogicaFake/LogicaFakeCambiarContrasenya.js';
import { cambiarContrasenya } from './LogicaFake/LogicaFakeCambiarContrasenya.js';

btonRecuperar.addEventListener('click',nuevacont);

//document.getElementById("nuevaContrasenya").addEventListener('input',seguridadContrasenya);

async function nuevacont(event){
    event.preventDefault();

    var nuevaContrasenya = inputnuevaContrasenya.value;
    var confNuevaContrasenya = inputconfContrasenya.value;
    let introduccirContActual = inputContrasenyaActual.value;

    let passwordCifrada = await hashPassword(introduccirContActual)
    let comprobar = await comprobarContrasenya(emailUsuario, passwordCifrada)
    console.log("comprobacion" + comprobar)
    if(comprobar=== true){
        console.log("AAAAA")
        if(nuevaContrasenya===confNuevaContrasenya){
            console.log("SE CAMBIO")
            let passwordNuevaCifrada = await hashPassword(nuevaContrasenya)
            await cambiarContrasenya(emailUsuario, passwordNuevaCifrada)

        }
    }
    /*

    if(nuevaContrasenya !== confNuevaContrasenya){
        errorLabel.classList.remove("hidden");
    }else{
        errorLabel.classList.add("hidden");
    }*/
}
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
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


