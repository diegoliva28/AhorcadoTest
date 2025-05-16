//Palabra
// const words=['facu','rocio','amilcar','diego','sebastian'];
// let numero=Math.floor(Math.random()*words.length);
// const palabraElegida=words[numero];
// let palabraOculta=generarPalabraOculta(palabraElegida);

const palabraElegida="diego";
let palabraOculta=generarPalabraOculta("diego");
let hiddenWord=palabraOculta.join(" ");
//Variables
let indiceImagen=0;
let intentos=7;
//Cronometro
let primeraVez=false;
let timer=60; // cantidad de segundos
let controladorTimer=null;

console.log(palabraElegida);

const container=document.querySelector(".container");
console.log(container);

//Etiquetas
let etiquetaTexto=document.querySelector('.hiddenWord');
let etiquetaImagen=document.getElementById("imagen")
let etiquetaAviso=document.querySelector(".soloUnaLetra");
let etiquetaLetra=document.querySelector('input');
let etiquetaLetraIngresadas=document.querySelector('.letrasIngresadas');
let etiquetaIntentos=document.querySelector('.intentosRestantes');
let etiquetaTimer=document.querySelector('.tiempo');
let mensaje=document.querySelector('.texto');
let etiquetaPista=document.querySelector('.pista');


etiquetaTexto.innerHTML=hiddenWord;

function evaluateWord(){

    if (!primeraVez) {
        contarTiempo();
        primeraVez=true;
        etiquetaPista.style.visibility="visible";
        //Probar hacer un metodo que sea iniciar partido y que se ejecute aca ciertas cosas
    }

        let valorLetra=etiquetaLetra.value;
        if (valorLetra.length==1) {
            etiquetaAviso.classList.remove("ocultar")
            
            let acierto=acertarLetra(valorLetra.toLowerCase());
            pierdeVida(acierto);

            hiddenWord=palabraOculta.join(" ");
            etiquetaTexto.innerHTML=hiddenWord;
            etiquetaLetraIngresadas.innerHTML+=valorLetra+" ";
        }
        else{
            etiquetaAviso.classList.add("ocultar");
        }
        
        if(finalizaLaPartida()){
             clearInterval(controladorTimer);
        }
        
        mostrarImagen();
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
    }
}

function mostrarImagen() {
      let source= "img/img"+indiceImagen+".png"
        //Seteo la direccion de la imagen
        etiquetaImagen.setAttribute("src",source); 


        //Joda
         if (!hiddenWord.includes("_")) {
        source= "img/momo2.jpg"
        //Seteo la direccion de la imagen
        etiquetaImagen.setAttribute("src",source);
    }
}

function finalizaLaPartida() {    
    let finalizo=false;
    if (!hiddenWord.includes("_")) {
        mensaje.classList.toggle("textoReinicio");
        mensaje.innerHTML='<h1 >Ganaste</h1> <button class="reiniciar" onclick="recargarPagina()">Reiniciar</button>';
        finalizo=true;
    }else if(intentos==0){
        mensaje.classList.toggle("textoReinicio");
        mensaje.innerHTML='<h1 >Perdiste</h1> <button class="reiniciar" onclick="recargarPagina()">Reiniciar</button>';
        finalizo=true;
    }
    return finalizo;
}

function contarTiempo() {
    controladorTimer= setInterval(()=>{
        timer--;
        // Etiqueta de tiempo
        etiquetaTimer.innerHTML="Tiempo restante: "+timer;
        // <h2 >c:</h2>
        if(timer==0){
            clearInterval(controladorTimer);
            indiceImagen=7;
            mensaje.classList.toggle("textoReinicio");
            mensaje.innerHTML='<h1 >Perdiste</h1> <button class="reiniciar" onclick="recargarPagina()">Reiniciar</button>';
            mostrarImagen();
        }
    },1000);    
}

function recargarPagina() {
 location.reload();
}

