console.log("BEEMA Running...");

//Braille PIN Numbers pairs
const Braille_PIN_mapping = {
    "100000":"1",
    "101000":"2",
    "110000":"3",
    "110100":"4",
    "100100":"5",
    "111000":"6",
    "111100":"7",
    "101100":"8",
    "011000":"9",
    "011100":"0"
};

// Variable intitialization

var digit = "";
let allDigits = Object.keys(Braille_PIN_mapping);
let allInputs = document.getElementsByTagName('input');
var n = 4;
var PINs = [];

// Keyboard keypress event management

document.addEventListener( "keydown", function(event) {
      if(String(event.key) == "ArrowUp"){
        getArrowValue("1");
      }
      if(String(event.key) == "ArrowDown"){
        getArrowValue("0");
      }
      if(String(event.key) == "ArrowRight"){
        clearDigits();
      }
    }, false );


function getArrowValue(i) {
  console.log(i);
  digit += i;
  if(digit.length == 6){
    if (allDigits.includes(digit)){
    console.log(digit, Braille_PIN_mapping[digit]);
    var audio = new Audio(chrome.runtime.getURL("Tones/"+Braille_PIN_mapping[digit] + ".mp3"));
    audio.play();
    var d = Braille_PIN_mapping[digit];
    PINs.push(d);
    digit = "";
    }
    else{
      console.log("Invalid entry");
      var audio = new Audio(chrome.runtime.getURL("Tones/invalid.mp3"));
      audio.play();
      digit = "";
    }
  }

  if(PINs.length != n+1){
    for (var i=0;i<PINs.length;i++){
      allInputs[i].value = PINs[i];
    }
  }
  else{
    console.log("LIMIT reached");
  }
}

// To clear digits

function clearDigits() {
  const v = document.getElementsByTagName("input");
  for(i=0;i<v.length;i++){
    if(v[i].type == 'password'){
      v[i].value = "";
    }
  }
  digit = "";
  PINs = [];
}