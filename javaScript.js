const words=['facu','rocio','amilcar','diego','sebastian'];
let numero=Math.floor(Math.random()*words.length);
const palabraElegida=words[numero];

let indiceImagen=0;
let intentos=7;
//Cronometro
let temporizador=false;
let timer=3; // cantidad de segundos
let controladorTimer=null;

console.log(palabraElegida)

let palabraOculta=generarPalabraOculta(palabraElegida);
let hiddenWord=palabraOculta.join(" ");


//Etiquetas
let etiquetaTexto=document.querySelector('.hiddenWord');
let etiquetaImagen=document.getElementById("imagen")
let etiquetaAviso=document.querySelector(".soloUnaLetra");
let etiquetaLetra=document.querySelector('input');
let etiquetaLetraIngresadas=document.querySelector('.letrasIngresadas');
let etiquetaIntentos=document.querySelector('.intentosRestantes');
let etiquetaTimer=document.querySelector('.tiempo');
 let mensaje=document.querySelector('.texto');
// document.querySelector('.hiddenWord').innerHTML=hiddenWord;

etiquetaTexto.innerHTML=hiddenWord;

// Funcion con escuchador
// document.querySelector('button').addEventListener('click',evaluateWord);
function evaluateWord(){

    if (!temporizador) {
        contarTiempo();
        temporizador=true;
    }

    let valorLetra=etiquetaLetra.value;
    // if (etiquetaLetra.value.length==1) {
    if (valorLetra.length==1) {
        etiquetaAviso.classList.remove("ocultar")
        
        let acierto=acertarLetra(valorLetra.toLowerCase());
        hiddenWord=palabraOculta.join(" ");
        etiquetaTexto.innerHTML=hiddenWord;
        pierdeVida(acierto);
        finalizaLaPartida();
        //Podria hacer un array y que se muestren solo X numero pero por ahora lo dejo asi
        etiquetaLetraIngresadas.innerHTML+=valorLetra+" ";
    }
    else{
        etiquetaAviso.classList.add("ocultar");
    }
    
    etiquetaIntentos.innerHTML=intentos
    etiquetaLetra.value="";
    etiquetaLetra.focus();
}

function acertarLetra(letraSeleccionada){
    let intento=false;

    for (let index = 0; index < palabraElegida.length; index++) {
        if (palabraElegida.charAt(index)==letraSeleccionada) {
            palabraOculta[index]=letraSeleccionada
            intento=true;
        }
     }
     return intento;
 }

function generarPalabraOculta(palabra){
    let palabraOculta=new Array();
    for (let i = 0 ;i <palabra.length; i++) {
        palabraOculta.push("_");
    }
return palabraOculta;
}

// function terminaElJuego(valorIntento,indiceImagen) {
function pierdeVida(valorIntento) {
    if (!valorIntento) {
        intentos--;
        indiceImagen++;
        let source= "img/img"+indiceImagen+".png"
        //Seteo la direccion de la imagen
        etiquetaImagen.setAttribute("src",source);        
    }
}

function finalizaLaPartida() {    
   

    if (!hiddenWord.includes("_")) {
        mensaje.innerHTML='<h1 >Ganaste</h1>'
    }else if(intentos==0){
        mensaje.innerHTML='<h1 >Perdiste</h1>'
        // mensaje.innerHTML='<h1 class="color">Perdiste</h1>'
    }
}

function contarTiempo() {
    controladorTimer= setInterval(()=>{
        timer--;
        // Etiqueta de tiempo
        etiquetaTimer.innerHTML="Tiempo restante: "+timer;
                // <h2 >c:</h2>
        if(timer==0){
            clearInterval(controladorTimer);
            mensaje.innerHTML='<h1 >Perdiste</h1>';
            let source= "img/img7.png";
            etiquetaImagen.setAttribute("src",source); 
        }
    },1000);    
}

