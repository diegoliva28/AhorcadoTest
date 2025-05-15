const words=['facu','rocio','amilcar','diego','sebastian'];

let numberWord=Math.floor(Math.random()*words.length);
const secretWord=words[numberWord];

console.log(secretWord)

let palabraNoMostrada=generarPalabraOculta(secretWord);
let hiddenWord=palabraNoMostrada.join(" ");

document.querySelector('.hiddenWord').innerHTML=hiddenWord;

let errorContador=0;
document.querySelector('button').addEventListener('click',evaluateWord);

function evaluateWord(){
    //Aca obtengo la etiqueta
    let letra=document.querySelector('input');
    console.log(typeof(letra.value));
   
    let acierto=acertarLetra(letra.value.toLowerCase());

    letra.value="";
    document.querySelector('.hiddenWord').innerHTML=hiddenWord;

    console.log(acierto)
    console.log(errorContador)
    if (!acierto) {
        errorContador++;
    }
    terminaElJuego(acierto,errorContador);
}
function terminaElJuego(valorIntento,indiceImagen) {
    if (!valorIntento) {
        const source= "img/img"+indiceImagen+".png"
        // asi armo la ruta de un archivo
        let etiqueta=document.getElementById("imagen")
        etiqueta.setAttribute("src",source);        
    }
    
    let mensaje=document.querySelector('.texto');

    if (!hiddenWord.includes("_")) {
        mensaje.innerHTML='<h1>Ganaste</h1>'
    }else if(indiceImagen==7){
        mensaje.innerHTML='<h1>Perdiste</h1>'

    }
}
function generarPalabraOculta(palabra){
    let palabraOculta=new Array();
    for (let i = 0 ;i <palabra.length; i++) {
        palabraOculta.push("_");
    }

return palabraOculta;
}
 function acertarLetra(letraSeleccionada){
    let intento=false;
    let letra=letraSeleccionada;
    for (let index = 0; index < secretWord.length; index++) {
        if (secretWord.charAt(index)==letraSeleccionada) {
            palabraNoMostrada[index]=letraSeleccionada
            intento=true;
        }
     }
     hiddenWord=palabraNoMostrada.join(" ");

     return intento;
 }





