const textoLogin = document.getElementById('sesion');
const menu = document.getElementById("main-menu");
menu.classList.remove("activo");

// (async () => {
//     const respuesta = await fetch('api/sesion/');
//     if(respuesta.ok){
//         textoLogin.textContent = 'Mi perfil';
//     }
// })();

document.querySelector(".hamburguesa").addEventListener(
    "click", () => {
        menu.classList.toggle("activo")
    }
)

document.querySelectorAll("#main-menu ul a").forEach(
    (enlace) => {
        enlace.addEventListener("click", () =>{
            menu.classList.remove("activo")
        })
    }
)
