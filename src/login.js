const cambiar = document.getElementById("switch");
const labelConfirmarContrasenya = document.getElementById("txtConfirmar")
const confirmarContrasenya = document.getElementById("confirm-password");

const switchBg = document.getElementById("switch-bg");

function switchCambiar(){
    if(!cambiar.classList.contains("switchActivo")){
        cambiar.classList.add("switchActivo");

        switchBg.style.left = "48%"; 
        switchBg.textContent = "Crear cuenta"

        labelConfirmarContrasenya.classList.remove("hidden");
        confirmarContrasenya.classList.remove("hidden");

    }else{
        cambiar.classList.remove("switchActivo");

        switchBg.style.left = "0%"; 
        switchBg.textContent = "Inicia sesión"

        labelConfirmarContrasenya.classList.add("hidden");
        confirmarContrasenya.classList.add("hidden");
        
    }
}





