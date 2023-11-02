/**
 * @brief Esta función obtiene datos desde un servidor local y los muestra en la página web.
 * 
 * Esta función realiza una solicitud GET a un servidor local y muestra los datos en una página web.
 * Si la solicitud no es exitosa, se maneja un error.
 */
async function registrarte() {
    try {
        
        //switchCambiar();
        const cambiar = document.getElementById("switch");
        // Obtener los valores de los campos de entrada
        const email = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;
        passwordHashed = await hashPassword(password);
        // Expresión regular para validar el correo electrónico
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        
        // Realizar una solicitud GET al servidor local
        const respuesta = await fetch('http://192.168.1.102:3001/api/sensor/registrate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ajustar los encabezados según sea necesario
            },
            body: JSON.stringify({email: email, password: passwordHashed}) // Ajustar el cuerpo según sea necesario
        });

        if (!respuesta.ok) {
            throw new Error('La solicitud no fue exitosa');
        }

        // Obtener los datos en formato JSON
        const datos = await respuesta.json();
        console.log('Datos recibidos desde el servidor local:', datos);
        if(datos == "existe"){
            emailError.textContent = 'Este correo ya existe';
        }
        else if(datos == true){
            // guarda el email del usuario logueado para usarlo en otros archivos
            localStorage.setItem('usuarioLogeado', email);
            // Redirige a la home.html
            window.location.href = 'home.html';
        }
        
        
    } catch (error) {
        console.error('Error:', error);
    }
}


    const emailInput = document.getElementById('usuario');
    const emailError = document.getElementById('email-error');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordMatchError = document.getElementById('password-match-error');

    // Expresión regular para validar el correo electrónico
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Validación de correo electrónico en tiempo real
    emailInput.addEventListener('input', function () {
        const email = emailInput.value;

        if (!emailRegex.test(email)) {
            emailError.textContent = 'Correo no válido';
        } else {
            emailError.textContent = '';
        }
    });

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if(cambiar.classList.contains("switchActivo")){
            const email = emailInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            emailCorrecto = false;
            passwordCorrecto = false;
    
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Correo no válido';
            } else {
                emailError.textContent = '';
                emailCorrecto = true;
            }
    
            if (emailError.textContent || (password !== confirmPassword)) {
                // Mostrar mensajes de error
                if (password !== confirmPassword) {
                    passwordMatchError.textContent = 'Las contraseñas no coinciden';
                }
            } else {
                passwordMatchError.textContent = '';
                passwordCorrecto = true;
            }
            if (emailCorrecto && passwordCorrecto) {
                hashPassword(password)
                .then(hash => {
                     console.log('Contraseña hasheada (SHA-256):', hash);
                     registrarte();
                })
                .catch(error => {
                 console.error('Error al hashear la contraseña:', error);
                 });
                
            }
        }
        else{
            const email = emailInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            emailCorrecto = false;
            passwordCorrecto = false;
    
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Correo no válido';
            } else {
                emailError.textContent = '';
                emailCorrecto = true;
            }

            if (emailCorrecto) {
                hashPassword(password)
                .then(hash => {
                     console.log('Contraseña hasheada (SHA-256):', hash);
                     iniciarSesion();
                })
                .catch(error => {
                 console.error('Error al hashear la contraseña:', error);
                 });
                
            }
            
        }
    });

// Función para hashear una contraseña usando SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}






async function iniciarSesion() {
    try {
        // Obtener los valores de los campos de entrada
        const email = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;
        passwordHashed = await hashPassword(password);
        // Expresión regular para validar el correo electrónico
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        
        // Realizar una solicitud GET al servidor local
        const respuesta = await fetch('http://192.168.1.102:3001/api/sensor/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ajustar los encabezados según sea necesario
            },
            body: JSON.stringify({email: email, password: passwordHashed}) // Ajustar el cuerpo según sea necesario
        });

        if (!respuesta.ok) {
            throw new Error('La solicitud no fue exitosa');
        }

        // Obtener los datos en formato JSON
        const datos = await respuesta.json();
        console.log('Datos recibidos desde el servidor local:', datos);
        if(datos == false){
            emailError.textContent = 'correo o contraseña incorrectos';
        }
        else if(datos == true){
            // guarda el email del usuario logueado para usarlo en otros archivos
            localStorage.setItem('usuarioLogeado', email);
            // Redirige a la home.html
            window.location.href = 'home.html';
        }
        
        
    } catch (error) {
        console.error('Error:', error);
    }
}