// inputs --------------------------------------------------------------------------------------------------------------
const inputContrasenyaActual = document.getElementById("contrasenyaAnterior");
const inputnuevaContrasenya = document.getElementById("nuevaContrasenya");
const inputconfContrasenya = document.getElementById("confNuevaContrasenya");

//botones --------------------------------------------------------------------------------------------------------------
const btonRecuperar = document.getElementById("boton-recuperar-contrasenya");
const btonCancelar = document.getElementById("boton-cancelar");

//Pop Ups --------------------------------------------------------------------------------------------------------------

const popupCancelar = document.getElementById("popup-cancelar-password");
const aceptarSalir= document.getElementById("aceptar-salir");
const cancelarSalir= document.getElementById("cancelar-salir");


popupCancelar.style.display="none";


//errores --------------------------------------------------------------------------------------------------------------
const errorLabel = document.getElementById("error");
const txtSeguridad = document.getElementById("txt-seguridad");
const errorPassword  = document.getElementById("texto-error");

// barra seguridad -----------------------------------------------------------------------------------------------------
const contSeg = document.getElementById("contenedor-seguridad");
const progresoSeguridad = document.getElementById("progreso-seguridad");
const lvlSeguridad = document.getElementById("nivel-seguridad");

// esconder la barra de seguridad hasta que se introzcan datos ---------------------------------------------------------
lvlSeguridad.classList.add("hidden");
contSeg.classList.add("hidden");
progresoSeguridad.classList.add("hidden");
txtSeguridad.classList.add("hidden");

// obtener los datos ---------------------------------------------------------------------------------------------------
const emailUsuario = localStorage.getItem('usuarioLogeado');

import { comprobarContrasenya } from './LogicaFake/LogicaFakeCambiarContrasenya.js';
import { cambiarContrasenya } from './LogicaFake/LogicaFakeCambiarContrasenya.js';

btonRecuperar.addEventListener('click',nuevaPassword);

inputnuevaContrasenya.addEventListener('input',seguridadContrasenya);
let passwordCorrecta = false

async function nuevaPassword(event){
    event.preventDefault();

    let nuevaContrasenya = inputnuevaContrasenya.value;
    let confNuevaContrasenya = inputconfContrasenya.value;
    let introduccirContActual = inputContrasenyaActual.value;

    let passwordCifrada = await hashPassword(introduccirContActual)
    let comprobar = await comprobarContrasenya(emailUsuario, passwordCifrada)

    console.log("comprobacion" + comprobar)
    if(comprobar=== true){
        errorPassword.classList.add("hidden");
        console.log("primer if")

        if(nuevaContrasenya===confNuevaContrasenya && passwordCorrecta===true){
            console.log("SE CAMBIO")
            errorLabel.classList.add("hidden");
            let passwordNuevaCifrada = await hashPassword(nuevaContrasenya)
            await cambiarContrasenya(emailUsuario, passwordNuevaCifrada)
        }else{
            errorLabel.classList.remove("hidden");
            console.log("ERROR")
        }
    }else{
        errorPassword.classList.remove("hidden");
        console.log("ERROR 2")
    }
}

async function hashPassword(password){
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function seguridadContrasenya(){

    let nuevaContrasenya = inputnuevaContrasenya.value;

    lvlSeguridad.classList.remove("hidden");
    contSeg.classList.remove("hidden");
    progresoSeguridad.classList.remove("hidden");
    txtSeguridad.classList.remove("hidden");

    const tieneLetras = /[a-zA-Z]/.test(nuevaContrasenya);
    const tieneNumeros = /[0-9]/.test(nuevaContrasenya);
    const tieneMayusculas = /[A-Z]/.test(nuevaContrasenya);
    console.log(passwordCorrecta)

    let porcentaje = 0;

    if(nuevaContrasenya.length===0){
        porcentaje= 0
        txtSeguridad.textContent="Tu contraseña debe tener al menos 8 carácteres";
        passwordCorrecta = false
    }
    else if (tieneLetras && !tieneNumeros && !tieneMayusculas || !tieneLetras && tieneNumeros && !tieneMayusculas || !tieneLetras && !tieneNumeros && tieneMayusculas|| nuevaContrasenya.length<8) {
        porcentaje = 20;
        txtSeguridad.textContent="Tu contraseña debe tener al menos 8 carácteres";
        progresoSeguridad.style.backgroundColor= "var(--txt-error)";
        passwordCorrecta = false

    }else if(tieneLetras && !tieneNumeros && !tieneMayusculas && nuevaContrasenya.length>=8|| !tieneLetras && tieneNumeros && !tieneMayusculas && nuevaContrasenya.length>=8 || !tieneLetras && !tieneNumeros && tieneMayusculas && nuevaContrasenya.length>=8 ){
        porcentaje = 20;
        txtSeguridad.textContent="Tu contraseña es poco segura";
        progresoSeguridad.style.backgroundColor= "var(--txt-error)";
        passwordCorrecta = false
    }
    else if (tieneLetras && tieneNumeros && !tieneMayusculas && nuevaContrasenya.length>=8|| !tieneLetras && tieneNumeros && tieneMayusculas && nuevaContrasenya.length>=8 || tieneLetras && !tieneNumeros && tieneMayusculas && nuevaContrasenya.length>=8) {
        porcentaje = 50;
        txtSeguridad.textContent="Tu contraseña es segura";
        progresoSeguridad.style.backgroundColor= "var(--intermedio)";
        passwordCorrecta = true
        

    } else if (tieneLetras && tieneNumeros && tieneMayusculas && nuevaContrasenya.length>=8) {
        porcentaje = 100;
        txtSeguridad.textContent="Tu contraseña es muy segura";
        progresoSeguridad.style.backgroundColor= "var(--bien)";
        passwordCorrecta = true
    }
    progresoSeguridad.style.width = porcentaje + "%";
}

// Pop Ups -------------------------------------------------------------------------------------------------------------

btonCancelar.addEventListener('click', function(event) {
    popupCancelar.showModal();
    popupCancelar.style.display="block";
});
function confirmarSalir(){

    popupCancelar.close();
    popupCancelar.style.display="none";

    window.location.href = 'perfil2.html';
}
function noSalir(){
    popupCancelar.close();
    popupCancelar.style.display="none";
}

aceptarSalir.addEventListener('click',confirmarSalir);
cancelarSalir.addEventListener('click',noSalir);




