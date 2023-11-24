(async () => {
    // VERIFICAR SI EXISTE UNA SESION INICIADA
    if(localStorage.getItem('usuarioRole') !== null){
        document.getElementById("sesion").innerHTML = "Mi cuenta";
    }
})();