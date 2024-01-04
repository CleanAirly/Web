// RUTA DEL SERVIDOR ---------------------------------------------------------------------------------------------------
let RUTA = 'http://192.168.43.64:3001/api/sensor';

// CERRAR SESION - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const botonCerrarSesion = document.getElementById("cerrar-sesion");
const popupCerrarSesion = document.getElementById("popup-cerrar-sesion");
const aceptarCerrarSesion = document.getElementById("aceptar-cerrar");
const cancelarCerrarSesion = document.getElementById("cancelar-cerrar")

// OPTION GROUP
const optionGroup = document.getElementById("optgroup");
let dataUsuariosFiltrada = [];

optionGroup.addEventListener('change', async function () {
    let opcionSeleccionada = this.options[this.selectedIndex].text;
    resetNombresTabla(7);
    switch (opcionSeleccionada) {
        case opcionSeleccionada = "Sin filtro" :
            optionGroupActivo = false;
            await cambiarPagina("inicio")
            break

        case opcionSeleccionada = "Nodos activos" :
            optionGroupActivo = true;
            filtro("activo");
            await cambiarPagina("inicio")
            break

        case opcionSeleccionada = "Nodos inactivos" :
            optionGroupActivo = true;
            filtro("inactivo");
            await cambiarPagina("inicio")
            break

        case opcionSeleccionada = "Sin datos" :
            optionGroupActivo = true;
            filtro("sin datos");
            await cambiarPagina("inicio")
            break
    }
});

function filtro(input){
    dataUsuariosFiltrada = [];
    for (let i = 0; i < dataUsuarios.length; i++) {
        if (dataUsuarios[i].estadoSonda.toLowerCase() === input) {
            dataUsuariosFiltrada.push(dataUsuarios[i]);
        }
    }
}

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

// ELEMENTOS PARA LA ORDENACION ----------------------------------------------------------------------------------------
const ordenarNombre = document.getElementById("ordenarNombre");
const ordenarEmail = document.getElementById("ordenarEmail");
const ordenarTelefono = document.getElementById("ordenarTelefono");
const ordenarSensor = document.getElementById("ordenarSensor");
const ordenarEstado = document.getElementById("ordenarEstado");
const ordenarTiempo = document.getElementById("ordenarTiempo");
let optionGroupActivo = false;

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
        let emailUsuarios = await emailNoAdmins();

        // POR CADA OBJETO (usuario) OBTENGO TODOS SUS DATOS
        for(let i= 0; i<emailUsuarios.length; i++){
            let data = await nombreUsuarioGet(emailUsuarios[i].email)
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
            dataUsuarios[i].estadoSonda = await inactividadSensor(dataUsuarios[i].email);
        }

        // CARGO LOS USUARIOS AL HTML
        cambiarPagina("inicio");

        // AÑADO LAS FUNCIONES DE ORDENACIÓN DE LOS ELEMENTOS:
        // NOMBRE
        let casoNombre = false;
        ordenarNombre.addEventListener( 'click', () => {
            resetNombresTabla(1);
            switch (casoNombre) {
                case false :
                    if(optionGroupActivo){
                        dataUsuariosFiltrada.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase(), 'es', {numeric: false}));
                    } else {
                        dataUsuarios.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase(), 'es', {numeric: false}));
                    }
                    cambiarPagina("inicio");
                    ordenarNombre.innerHTML = "Nombre ▼";
                    casoNombre = true;
                    break

                case true :
                    if(optionGroupActivo){
                        dataUsuariosFiltrada.sort((a, b) => b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase(), 'es', {numeric: false}));
                    } else {
                        dataUsuarios.sort((a, b) => b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase(), 'es', {numeric: false}));
                    }
                    cambiarPagina("inicio");
                    ordenarNombre.innerHTML = "Nombre ▲";
                    casoNombre = false;
                    break
            }
        });

        // EMAIL
        let casoEmail = false;
        ordenarEmail.addEventListener( 'click', () => {
            resetNombresTabla(2);
            switch (casoEmail) {
                case false :
                    if(optionGroupActivo){
                        dataUsuariosFiltrada.sort((a, b) => a.email.toLowerCase().localeCompare(b.email.toLowerCase(), 'es', {numeric: true}));
                    } else {
                        dataUsuarios.sort((a, b) => a.email.toLowerCase().localeCompare(b.email.toLowerCase(), 'es', {numeric: true}));
                    }
                    cambiarPagina("inicio");
                    ordenarEmail.innerHTML = "Email ▼";
                    casoEmail = true;
                    break

                case true :
                    if(optionGroupActivo){
                        dataUsuariosFiltrada.sort((a, b) => b.email.toLowerCase().localeCompare(a.email.toLowerCase(), 'es', {numeric: true}));
                    } else {
                        dataUsuarios.sort((a, b) => b.email.toLowerCase().localeCompare(a.email.toLowerCase(), 'es', {numeric: true}));
                    }
                    cambiarPagina("inicio");
                    ordenarEmail.innerHTML = "Email ▲";
                    casoEmail = false;
                    break
            }
        })

        // TELEFONO
        let casoTelefono = false;
        ordenarTelefono.addEventListener( 'click', () => {
            resetNombresTabla(3);
            switch (casoTelefono) {
                case false :
                    if(optionGroupActivo){
                        dataUsuariosFiltrada.sort((a, b) => a.telefono.toLowerCase().localeCompare(b.telefono.toLowerCase(), 'es', {numeric: true}));
                    } else {
                        dataUsuarios.sort((a, b) => a.telefono.toLowerCase().localeCompare(b.telefono.toLowerCase(), 'es', {numeric: true}));
                    }
                    cambiarPagina("inicio");
                    ordenarTelefono.innerHTML = "Teléfono ▲";
                    casoTelefono = true;
                    break

                case true :
                    if(optionGroupActivo){
                        dataUsuariosFiltrada.sort((a, b) => b.telefono.toLowerCase().localeCompare(a.telefono.toLowerCase(), 'es', {numeric: true}));
                    } else {
                        dataUsuarios.sort((a, b) => b.telefono.toLowerCase().localeCompare(a.telefono.toLowerCase(), 'es', {numeric: true}));
                    }
                    cambiarPagina("inicio");
                    ordenarTelefono.innerHTML = "Teléfono ▼";
                    casoTelefono = false;
                    break
            }
        })

        // SENSOR
        let casoSensor = false;
        ordenarSensor.addEventListener( 'click', () => {
            resetNombresTabla(4);
            switch (casoSensor) {
                case false :
                    if(optionGroupActivo){
                        dataUsuariosFiltrada.sort((a, b) => a.idSonda.toString().toLowerCase().localeCompare(b.idSonda.toString().toLowerCase(), 'es', {numeric: true}));
                    } else {
                        dataUsuarios.sort((a, b) => a.idSonda.toString().toLowerCase().localeCompare(b.idSonda.toString().toLowerCase(), 'es', {numeric: true}));
                    }
                    cambiarPagina("inicio");
                    ordenarSensor.innerHTML = "Sensor ▲";
                    casoSensor = true;
                    break

                case true :
                    if(optionGroupActivo){
                        dataUsuariosFiltrada.sort((a, b) => b.idSonda.toString().toLowerCase().localeCompare(a.idSonda.toString().toLowerCase(), 'es', {numeric: true}));
                    } else {
                        dataUsuarios.sort((a, b) => b.idSonda.toString().toLowerCase().localeCompare(a.idSonda.toString().toLowerCase(), 'es', {numeric: true}));
                    }
                    cambiarPagina("inicio");
                    ordenarSensor.innerHTML = "Sensor ▼";
                    casoSensor = false;
                    break
            }
        })

        // ESTADO SENSOR
        let casoEstado = false;
        ordenarEstado.addEventListener( 'click', () => {
            if(!optionGroupActivo){
                resetNombresTabla(5);
                switch (casoEstado) {
                    case false :
                        dataUsuarios.sort((a, b) => a.estadoSonda.toLowerCase().localeCompare(b.estadoSonda.toLowerCase(), 'es', {numeric: true}));
                        cambiarPagina("inicio");
                        ordenarEstado.innerHTML = "Estado del sensor ▼";
                        casoEstado = true;
                        break

                    case true :
                        dataUsuarios.sort((a, b) => b.estadoSonda.toLowerCase().localeCompare(a.estadoSonda.toLowerCase(), 'es', {numeric: true}));
                        cambiarPagina("inicio");
                        ordenarEstado.innerHTML = "Estado del sensor ▲";
                        casoEstado = false;
                        break
                }
            }
        })

        console.log(dataUsuarios);
    }
})();

function resetNombresTabla(caso){
    switch (caso) {
        // NOMBRE
        case caso = 1 :
            ordenarEmail.innerHTML = "Email"
            ordenarTelefono.innerHTML = "Teléfono"
            ordenarSensor.innerHTML = "Sensor"
            ordenarEstado.innerHTML = "Estado del sensor"
            ordenarTiempo.innerHTML = "Tiempo en el estado actual"
            break

        // EMAIL
        case caso = 2 :
            ordenarNombre.innerHTML = "Nombre"
            ordenarTelefono.innerHTML = "Teléfono"
            ordenarSensor.innerHTML = "Sensor"
            ordenarEstado.innerHTML = "Estado del sensor"
            ordenarTiempo.innerHTML = "Tiempo en el estado actual"
            break

        // TELEFONO
        case caso = 3 :
            ordenarNombre.innerHTML = "Nombre"
            ordenarEmail.innerHTML = "Email"
            ordenarSensor.innerHTML = "Sensor"
            ordenarEstado.innerHTML = "Estado del sensor"
            ordenarTiempo.innerHTML = "Tiempo en el estado actual"
            break

        // SENSOR
        case caso = 4 :
            ordenarNombre.innerHTML = "Nombre"
            ordenarEmail.innerHTML = "Email"
            ordenarTelefono.innerHTML = "Teléfono"
            ordenarEstado.innerHTML = "Estado del sensor"
            ordenarTiempo.innerHTML = "Tiempo en el estado actual"
            break

        // ESTADO DEL SENSOR
        case caso = 5 :
            ordenarNombre.innerHTML = "Nombre"
            ordenarEmail.innerHTML = "Email"
            ordenarTelefono.innerHTML = "Teléfono"
            ordenarSensor.innerHTML = "Sensor"
            ordenarTiempo.innerHTML = "Tiempo en el estado actual"
            break

        // TIEMPO EN EL ESTADO ACTUAL
        case caso = 6 :
            ordenarNombre.innerHTML = "Nombre"
            ordenarEmail.innerHTML = "Email"
            ordenarTelefono.innerHTML = "Teléfono"
            ordenarSensor.innerHTML = "Sensor"
            ordenarEstado.innerHTML = "Estado del sensor"
            break

        // TODOS
        case caso = 7 :
            ordenarNombre.innerHTML = "Nombre"
            ordenarEmail.innerHTML = "Email"
            ordenarTelefono.innerHTML = "Teléfono"
            ordenarSensor.innerHTML = "Sensor"
            ordenarEstado.innerHTML = "Estado del sensor"
            ordenarTiempo.innerHTML = "Tiempo en el estado actual"
            break
    }
}

// FUNCIÓN PARA OBTENER EL ESTADO DEL SENSOR DEL USUARIO ---------------------------------------------------------------
async function inactividadSensor(email){
    try {
        let respuesta = await fetch(RUTA+'/inactividadSensor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        });
        return await respuesta.json();
    } catch (e) {
        console.log("Error: "+e);
    }
}

// FUNCIÓN PARA OBTENER TODOS LOS EMAILS DE USUARIOS QUE NO SEA ADMINISTRADORES ----------------------------------------
async function emailNoAdmins(){
    try{
        let respuesta = await fetch(RUTA+'/emailNoAdmins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        return await respuesta.json()
    } catch (e) {
        console.log("Error: "+e);
    }
}

// FUNCIÓN PARA OBTENER LOS DATOS DEL USUARIO A TRAVÉS DE SU EMAIL -----------------------------------------------------
async function nombreUsuarioGet(email){
    try{
        let respuesta = await fetch(RUTA+'/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        });
        return await respuesta.json()
    } catch (e) {
        console.log("Error: "+e);
    }
}

// FUNCIÓN PARA CREAR LOS ELEMENTOS HTML QUE MUESTRAN LA INFORMACIÓN DEL USUARIO - - - - - - - - - - - - - - - - - - - -
async function createUserRow(nombre, email, telefono, idSensor, estadoSensor){
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

    //const borrar = document.createElement("img");
    //borrar.setAttribute("src", "images/icono_borrar.svg")
    //borrar.setAttribute("onclick", "popUpBorrarUsuario('"+email+"')")
    //borrar.classList.add("checkbox")

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
    contenedorTiempo.innerHTML = await tiempoEnElEstadoActual(email)

    // JUNTO LOS ELEMENTOS SEGÚN EL ORDEN ESTABLECIDO
    //contenedorCheckbox.appendChild(borrar);
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
async function cambiarPagina(metodo) {
    let datosUsuarios = [];
    if (optionGroupActivo) {
        ultimaPagina = Math.ceil(dataUsuariosFiltrada.length / usuariosPorPagina);
        datosUsuarios = dataUsuariosFiltrada;
    } else {
        ultimaPagina = Math.ceil(dataUsuarios.length / usuariosPorPagina);
        datosUsuarios = dataUsuarios;
    }

    if (metodo === "inicio") {
        pagina = 1;
    } else if (metodo === "anterior" && pagina > 1) {
        pagina--;
    } else if (metodo === "siguiente" && pagina < ultimaPagina) {
        pagina++;
    }

    mostrarOcultarIconos();
    limpiarTabla()

    let inicio = (pagina - 1) * usuariosPorPagina;
    for (let i = inicio; i < inicio + usuariosPorPagina; i++) {
        if (datosUsuarios[i]) {
            await createUserRow(datosUsuarios[i].nombre, datosUsuarios[i].email, datosUsuarios[i].telefono, datosUsuarios[i].idSonda, datosUsuarios[i].estadoSonda);
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
        if(usuariosCumplenBusqueda[i]) createUserRow(usuariosCumplenBusqueda[i].nombre, usuariosCumplenBusqueda[i].email, usuariosCumplenBusqueda[i].telefono, usuariosCumplenBusqueda[i].idSonda, usuariosCumplenBusqueda[i].estadoSonda,);
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

async function ultimaMedidaGet(email){
    try{
        let respuesta = await fetch(RUTA+'/medida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        });
        return await respuesta.json()
    } catch (e) {
        console.log("Error: "+e);
    }
}

async function tiempoEnElEstadoActual(email){
    let ultimaMedida = await ultimaMedidaGet(email);
    if(ultimaMedida !== null){
        const fechaActual = new Date();
        const fechaUltimaMedida = new Date(ultimaMedida.instante);
        const diferenciaTiempo = fechaActual - fechaUltimaMedida;

        // Calcular los días, horas y minutos
        const dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenciaTiempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenciaTiempo % (1000 * 60 * 60)) / (1000 * 60));

        return `${dias} días, ${horas} horas, ${minutos} minutos`;
    } else {
        return "sin datos"
    }
}