
const progressBarFill = document.querySelector('.progress-bar-fill'); 
const mostrarValor = document.getElementById("texto-informativo");
var valorCreciente =50;
var start= 0;

function setProgressBar(progress) {
    

    const totalLength = 596.9; 
    const dashoffset = totalLength - (progress / 100) * totalLength;
    if (progress <= 30) {
        progressBarFill.setAttribute('stroke', 'var(--botones)');
    } else if (progress > 30 && progress < 70) {
        progressBarFill.setAttribute('stroke', '#d6c918');
    } else {
        progressBarFill.setAttribute('stroke', 'var(--txt-error)');
    }
    progressBarFill.style.strokeDashoffset = dashoffset;
}

setProgressBar(valorCreciente); 


 function aumenta(){
     // Usamos un intervalo para realizar el aumento de manera gradual
     let progress=setInterval(()=>{
         if(start<valorCreciente){
             //para que se vea como aumenta poco a poco 
             start++;
             ProgressEND();
         }else if(start>valorCreciente){
             //para que se vea como decrece
             start--;
             ProgressEND();
         }
         function ProgressEND(){
             //hago que mi texto aumente poco a poco
             mostrarValor.textContent =`${start}ppm`
             //para que cuando llegue al valor no siga aumentando
             if(start==valorCreciente){
                 clearInterval(progress);
                 valorCreciente = "";
             }
         }
     },15)//quiero que lo haga en 15 segundos
 }

aumenta();