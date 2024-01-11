let valorCreciente =80;
let start= 0;
const progressBarFill = document.querySelector('.progress-bar-fill');
const mostrarValor = document.getElementById("porcentaje-bateria");
setProgressBar(80);
aumenta();
function setProgressBar(progress){
    const totalLength = 596.9;
    const dashoffset = totalLength - (progress / 100) * totalLength;
    progressBarFill.setAttribute('stroke', '#1E8484');

    progressBarFill.style.strokeDashoffset = dashoffset;
}

function aumenta(){
    // Usamos un intervalo para realizar el aumento de manera gradual
    let progress=setInterval(()=>{
        if(start<valorCreciente){
            //para que se vea como aumenta poco a poco
            start = start + 2;
            ProgressEND();
        }else if(start>valorCreciente){
            //para que se vea como decrece
            start--;
            ProgressEND();
        }
        function ProgressEND(){
            //hago que mi texto aumente poco a poco
            mostrarValor.innerHTML =`${start}%`
            //para que cuando llegue al valor no siga aumentando
            if(start === valorCreciente){
                clearInterval(progress);
                valorCreciente = "";
            }
        }
    },1)//quiero que lo haga en 15 segundos (mientras mas grande el valor en menos tiempo hay que hacerlo)
}