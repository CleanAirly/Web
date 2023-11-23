// CERRAR SESION - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const botonCerrarSesion = document.getElementById("cerrar-sesion");
const popupCerrarSesion = document.getElementById("popup-cerrar-sesion");
const aceptarCerrarSesion = document.getElementById("aceptar-cerrar");
const cancelarCerrarSesion = document.getElementById("cancelar-cerrar")

botonCerrarSesion.addEventListener('click', () => {
    popupCerrarSesion.showModal();
    popupCerrarSesion.style.display="block";
})

// ACEPTAR
function realizarCierreDeSesion(){
    localStorage.removeItem('usuarioLogeado');
    localStorage.removeItem('usuarioRole');
    location.href = 'index.html';
    popupCerrarSesion.close();
    popupCerrarSesion.style.display="none";
}

// CANCELAR
function cerrarSalir() {
    popupCerrarSesion.close();
    popupCerrarSesion.style.display="none";
}

aceptarCerrarSesion.addEventListener('click', realizarCierreDeSesion);
cancelarCerrarSesion.addEventListener('click', cerrarSalir);

// BORRAR USUARIO - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const popupBorrar = document.getElementById("popup-borrar-usuario");
const cancelarBorrar= document.getElementById("cancelar-borrar");
const aceptarError= document.getElementById("aceptar-borrar");

// ABRIR EL POPUP
function popUpBorrarUsuario(email){
    document.getElementById("texto-popup-borrarUsuario").innerHTML = "¿Borrar el usuario "+email+"?<br><br>Esta acción es irreversible."
    popupBorrar.showModal();
    popupBorrar.style.display="block";
}

// ACEPTAR
function borrarUsuario(){

    popupBorrar.close();
    popupBorrar.style.display="none";
}

// CANCELAR
function cerrarPopUP(){
    popupBorrar.close();
    popupBorrar.style.display="none";
}

cancelarBorrar.addEventListener('click',cerrarPopUP);
aceptarError.addEventListener('click',borrarUsuario);

// DATOS DE LOS USUARIOS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let dataUsuarios = [];

// VARIABLES PARA LA TABLA
let pagina = 1;
let ultimaPagina;
let usuariosPorPagina = 6;

// FUNCIÓN AUTOINVOCADA AL SOLICITAR LA PAGINA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
    // OCULTO LOS POP UP
    popupBorrar.style.display="none";
    popupCerrarSesion.style.display="none";

    // VERIFICAR QUE EL USUARIO QUE HA ENTRADO A LA PAGINA ES ADMIN
    if(localStorage.getItem('usuarioRole') === null || localStorage.getItem('usuarioRole') === "usuario"){
        location.href = 'index.html'
    } else {
        // VISIBILIZO LA PAGINA
        document.body.classList.remove("noVisible");

        // OBTENGO LOS EMAILS DE TODOS LOS USUARIOS CON UNA ARRAY DE {'email':'correo@email.com'}
        let emailUsuarios = await getAllEmails();

        // POR CADA OBJETO (usuario) OBTENGO TODOS SUS DATOS
        for(let i= 0; i<emailUsuarios.length; i++){
            let data = await getDataFromEmail(emailUsuarios[i].email)
            dataUsuarios.push(data);
        }

        // JUNTO LA ARRAY DE EMAIL CON DATA PARA TRABAJAR MEJOR
        if(emailUsuarios.length === dataUsuarios.length){
            for(let i= 0; i<dataUsuarios.length; i++){
                if(dataUsuarios[i] !== null) { dataUsuarios[i].email = emailUsuarios[i].email; }
            }
        }

        // ELIMINO VALORES NULL DEL ARRAY
        dataUsuarios = dataUsuarios.filter( usuario => usuario !== null);

        // POR CADA USUARIO OBTENGO SI SU SENSOR SE ENCUENTRA ACTIVO O INACTIVO
        for(let i = 0; i<dataUsuarios.length; i++){
            dataUsuarios[i].estadoSonda = await getSondaState(dataUsuarios[i].email);
        }

        // CARGO LOS USUARIOS AL HTML
        cambiarPagina("inicio");
        console.log(dataUsuarios);
    }
})();

// FUNCIÓN PARA OBTENER EL ESTADO DEL SENSOR DEL USUARIO - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function getSondaState(email){
    let respuesta = await fetch('http://192.168.1.47:3001/api/sensor/inactividadSensor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
    });
    return await respuesta.json();
}

// FUNCIÓN PARA OBTENER TODOS LOS EMAILS DE USUARIOS QUE NO SEA ADMINISTRADORES - - - - - - - - - - - - - - - - - - - -
async function getAllEmails(){
    let respuesta = await fetch('http://192.168.1.47:3001/api/sensor/emailNoAdmins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    return await respuesta.json()
}

// FUNCIÓN PARA OBTENER LOS DATOS DEL USUARIO A TRAVÉS DE SU EMAIL - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function getDataFromEmail(email){
    let respuesta = await fetch('http://192.168.1.47:3001/api/sensor/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
    });
    return await respuesta.json()
}

// FUNCIÓN PARA CREAR LOS ELEMENTOS HTML QUE MUESTRAN LA INFORMACIÓN DEL USUARIO - - - - - - - - - - - - - - - - - - - -
function createUserRow(nombre, email, telefono, idSensor, estadoSensor){
    // OBTENGO DONDE SE INSERTARÁ EL USUARIO
    const insertarAqui = document.getElementById("contenedor-tabla");
    const aPartirDeAqui = document.getElementById("contenedor-paginas");

    // CREO LOS ELEMENTOS HTML NECESARIOS
    const contenedorUsuario = document.createElement("div");
    contenedorUsuario.classList.add("contenedor-usuario");
    contenedorUsuario.classList.add("eliminar-contenedor");

    const contenedorCheckbox = document.createElement("div");
    contenedorCheckbox.classList.add("contenedor-checkbox")
    contenedorCheckbox.classList.add("centrar")

    const borrar = document.createElement("img");
    borrar.setAttribute("src", "images/icono_borrar.svg")
    borrar.setAttribute("onclick", "popUpBorrarUsuario('"+email+"')")
    borrar.classList.add("checkbox")

    const editar = document.createElement("img");
    editar.setAttribute("src", "images/icono_editar.svg")
    editar.setAttribute("onclick", "redireccion('"+email+"')")
    editar.classList.add("checkbox")

    const contenedorNombre = document.createElement("div");
    contenedorNombre.classList.add("contenedor-nombre")
    contenedorNombre.textContent = nombre;

    const contenedorEmail = document.createElement("div");
    contenedorEmail.classList.add("contenedor-email")
    contenedorEmail.textContent = email;

    const contenedorTelefono = document.createElement("div");
    contenedorTelefono.classList.add("contenedor-telefono")
    contenedorTelefono.textContent = telefono;

    const contenedorSensor = document.createElement("div");
    contenedorSensor.classList.add("contenedor-sensor")
    contenedorSensor.textContent = idSensor;

    const contenedorEstadoSensor = document.createElement("div");
    contenedorEstadoSensor.classList.add("contenedor-estadosensor")
    contenedorEstadoSensor.textContent = estadoSensor;

    const contenedorTiempo = document.createElement("div");
    contenedorTiempo.classList.add("contenedor-tiempo")

    // JUNTO LOS ELEMENTOS SEGÚN EL ORDEN ESTABLECIDO
    contenedorCheckbox.appendChild(borrar);
    contenedorCheckbox.appendChild(editar);
    contenedorUsuario.appendChild(contenedorCheckbox);
    contenedorUsuario.appendChild(contenedorNombre);
    contenedorUsuario.appendChild(contenedorEmail);
    contenedorUsuario.appendChild(contenedorTelefono);
    contenedorUsuario.appendChild(contenedorSensor);
    contenedorUsuario.appendChild(contenedorEstadoSensor);
    contenedorUsuario.appendChild(contenedorTiempo);
    insertarAqui.insertBefore(contenedorUsuario, aPartirDeAqui);
}

// FUNCIÓN PARA MOSTRAR Y OCULTAR LAS FLECHAS PARA CAMBIAR DE PÁGINA EN LA TABLA DE USUARIOS - - - - - - - - - - - - - -
function mostrarOcultarIconos(){
    const iconoAnterior = document.getElementById("anterior");
    const iconoSiguiente = document.getElementById("siguiente");

    if(pagina === 1){
        iconoAnterior.classList.add("noVisible");
        if(ultimaPagina === pagina){
            iconoSiguiente.classList.add("noVisible");
        }
        else {
            iconoSiguiente.classList.remove("noVisible");
        }
    }
    if(pagina === ultimaPagina){
        iconoSiguiente.classList.add("noVisible");
        if(ultimaPagina>1){
            iconoAnterior.classList.remove("noVisible");
        }
    }
    if(pagina>1 && pagina<ultimaPagina){
        iconoAnterior.classList.remove("noVisible");
        iconoSiguiente.classList.remove("noVisible");
    }
}

// FUNCIÓN PARA CAMBIAR ENTRE LAS PÁGINAS DE LA TABLA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function cambiarPagina(metodo){
    ultimaPagina = Math.ceil(dataUsuarios.length / usuariosPorPagina);

    if(metodo === "inicio"){
        pagina = 1;
    }
    else if (metodo === "anterior" && pagina>1){
        pagina--;
    }
    else if (metodo === "siguiente" && pagina<ultimaPagina){
        pagina++;
    }
    else if(metodo === "actual"){
    }

    mostrarOcultarIconos();

    limpiarTabla()

    let inicio = (pagina - 1) * usuariosPorPagina;
    for(let i = inicio; i<inicio + usuariosPorPagina; i++){
        if(dataUsuarios[i]){
            createUserRow(dataUsuarios[i].nombre, dataUsuarios[i].email, dataUsuarios[i].telefono, dataUsuarios[i].idSonda, dataUsuarios[i].estadoSonda);
        }
    }
}

// FUNCIÓN PARA BUSCAR USUARIOS MEDIANTE LA BARRA DE BÚSQUEDA - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function buscarUsuario(){
    let input = document.getElementById("barraBusqueda").value;
    input = input.toLowerCase();
    let usuariosCumplenBusqueda = [];

    for (let i = 0; i < dataUsuarios.length; i++) {
        if (dataUsuarios[i].nombre.toLowerCase().includes(input) || dataUsuarios[i].email.toLowerCase().includes(input) || dataUsuarios[i].telefono.toLowerCase().includes(input)) {
            usuariosCumplenBusqueda.push(dataUsuarios[i]);
        }
    }
    ultimaPagina = Math.ceil(usuariosCumplenBusqueda.length / usuariosPorPagina);

    mostrarOcultarIconos();

    limpiarTabla();

    let inicio = (pagina - 1) * usuariosPorPagina;
    for(let i = inicio; i<inicio + usuariosPorPagina; i++){
        if(usuariosCumplenBusqueda[i]) createUserRow(usuariosCumplenBusqueda[i].nombre, usuariosCumplenBusqueda[i].email, usuariosCumplenBusqueda[i].telefono, usuariosCumplenBusqueda[i].idSonda);
    }
}

// FUNCIÓN PARA REINICIAR LOS ELEMENTOS CREADOS EN LA TABLA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function limpiarTabla(){
    const listaDivEliminar = document.querySelectorAll(".eliminar-contenedor");
    listaDivEliminar.forEach( (div) => {
        div.remove();
    });
}

// FUNCIÓN ASIGNADA A CADA NUEVO ELEMENTO DE LA TABLA PARA REDIRIGIR A SU PAGINA DE EDITAR - - - - - - - - - - - - - - -
function redireccion(email){
    localStorage.setItem("emailUsuarioEditar", email);
    dataUsuarios.forEach( usuario => {
        if(usuario.email === email){
            localStorage.setItem("nombreUsuarioEditar", usuario.nombre);
            localStorage.setItem("telefonoUsuarioEditar", usuario.telefono);
            localStorage.setItem("sensorUsuarioEditar", usuario.idSonda.toString());
        }
    })
    location.href = "adminEditar.html";
}