// inputs --------------------------------------------------------------------------------------------------------------
const inputnuevaContrasenya = document.getElementById("nuevaContrasenya");
const inputconfContrasenya = document.getElementById("confNuevaContrasenya");

//botones --------------------------------------------------------------------------------------------------------------
const btonRecuperar = document.getElementById("boton-recuperar-contrasenya");

//errores --------------------------------------------------------------------------------------------------------------
const errorLabel = document.getElementById("error");
const txtSeguridad = document.getElementById("txt-seguridad");

//barra seguridad ------------------------------------------------------------------------------------------------------
const lvlSeguridad = document.getElementById("nivel-seguridad");
const contSeg = document.getElementById("contenedor-seguridad");
const progresoSeguridad = document.getElementById("progreso-seguridad");
//Pop Ups --------------------------------------------------------------------------------------------------------------
const popupCambio = document.getElementById("popup-password-cambiada");
const aceptarSalir= document.getElementById("aceptar-cambio");

popupCambio.style.display="none";

// esconder la barra de seguridad hasta que se introzcan datos ---------------------------------------------------------
lvlSeguridad.classList.add("hidden");
contSeg.classList.add("hidden");
progresoSeguridad.classList.add("hidden");
txtSeguridad.classList.add("hidden");


// Obtener el email de la URL
const params = new URLSearchParams(window.location.search);
const emailRecibido = params.get('email');

// Hacer lo que necesites con el email recibido
console.log('Email recibido:', emailRecibido);

// obtener los datos ---------------------------------------------------------------------------------------------------
const emailUsuario = emailRecibido;

import {cambiarContrasenya, comprobarContrasenya} from './LogicaFake/LogicaFakeCambiarContraseny5.js';


btonRecuperar.addEventListener('click',nuevaPassword);
inputnuevaContrasenya.addEventListener('input',seguridadContrasenya);

let passwordCorrecta = false

async function nuevaPassword(event){
    event.preventDefault();

    let nuevaContrasenya = inputnuevaContrasenya.value;
    let confNuevaContrasenya = inputconfContrasenya.value;

    if(nuevaContrasenya===confNuevaContrasenya && passwordCorrecta===true){
        console.log("SE CAMBIO")
        errorLabel.classList.add("hidden");
        let passwordNuevaCifrada = await hashPassword(nuevaContrasenya)
        await cambiarContrasenya(emailUsuario, passwordNuevaCifrada)
        popupCambio.showModal();
        popupCambio.style.display="block";
    }else{
        errorLabel.classList.remove("hidden");
        console.log("ERROR")
    }
}
function confirmarSalir(){
    window.location.href = 'login.html';
    popupCambio.close();
    popupCambio.style.display="none";
}

aceptarSalir.addEventListener('click',confirmarSalir);


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
        txtSeguridad.textContent="Tu contraseña debe tener al menos 8 carácteres, una letra y un número";
        passwordCorrecta = false
    }
    else if (tieneLetras && !tieneNumeros && !tieneMayusculas || !tieneLetras && tieneNumeros && !tieneMayusculas || !tieneLetras && !tieneNumeros && tieneMayusculas|| nuevaContrasenya.length<8) {
        porcentaje = 20;
        txtSeguridad.textContent="Tu contraseña debe tener al menos 8 carácteres,  una letra y un número";
        progresoSeguridad.style.backgroundColor= "var(--txt-error)";
        passwordCorrecta = false

    }else if(tieneLetras && !tieneNumeros && !tieneMayusculas && nuevaContrasenya.length>=8|| !tieneLetras && tieneNumeros && !tieneMayusculas && nuevaContrasenya.length>=8 || !tieneLetras && !tieneNumeros && tieneMayusculas && nuevaContrasenya.length>=8 ){
        porcentaje = 20;
        txtSeguridad.textContent="Tu contraseña es poco segura";
        progresoSeguridad.style.backgroundColor= "var(--txt-error)";
        passwordCorrecta = true
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

async function hashPassword(password){
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}





