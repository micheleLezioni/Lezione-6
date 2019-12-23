//RECAP ARRAY
//Metodi high order per gli array
//Map, filter, find, findIndex, reduce

//Map
//Cosa fa? => Trasforma gli elementi dell'array restituendo un array di elementi modificati
//Sintassi
//come parametro prende una callback
//l'unico parametro "obbligatorio" è il primo che rappresenta SEMPRE l'elemento corrente
//Parliamo di elemento corrente perché map (come tutti gli altri metodi) esegue la funzione di callback su tutti gli elementi dell'array
/* 
var myArray = [1,2,3,4]

const myFunction = (current) => current + 2  // perché l'arrow function ha un return implicito
function myFunction (current)=> {
  return current+2
}

myArray.map(myFunction)

let arrayTrasformato = myArray.map( (current) => current + 2 ))

//abbiamo utilizzato map come se fosse un filter
let arrayTrasformato = myArray.map( (current) => {
  if(current>2){
  return current
} )
})


//Filter
//Come map RITORNA un array ( se la funzione ritorna FALSE per ogni elemento filter ritorna un array vuoto [] )
//Argomento necessario è il primo che rappresenta l'elemento corrente
//Cosa fa? => Filtra gli elementi basandosi su una condizione => se la funzione di callback ritorna TRUE filter prende l'elemento corrente e lo
//inserisce dentro un array

const elementiMaggioriDiDue = (current)=> current > 2  // ritorna currnet > 2 => RITORNA TRUE OR FALSE

let arrayFiltrato = myArray.filter(elementiMaggioriDiDue)


//Find
//molto simile al filter
//A differenza del filter non ritorna un array ma ESTRAE il primo l'elemento che verifica la condizione
//Una volta che ha trovato l'elemento stoppa l'esecuzione
// ma se non trova niente ritorna undefined

const qualcosaDaTrovare = myArray.find((current)=> current == 2)

//FindIndex
//molto simile a find
//A differenza di find non ESTRAE l'elemento ma la sua posizione
var index = myArray.findIndex((current)=>current == 2)


//Reduce
//Cosa fa? Riduce(ritorna) l'array ad un singolo elemento
//Argomenti della funzione fondamentali sono 2 => 
// 1) rappresenta l'elemento che alla fine di reduce verrà ritornato ma anche "l'accumulatore" 
//2) rappresenta l'elemento corrente
//QUELLO CHE LA FUNZIONE RITORNA VIENE SALVATO NELL'ACCUMULATORE (prev)
var myArray = [1,2,3,4,5] => 

1) elemento 1
prev = 1
current = 1
la funzione ritorna current che va a finire in prev
2) elemento 2
prev = 1
current = 2
la funzione ritorna current che va a finire in prev
2) elemento 3
prev = 2
current = 3
la funzione ritorna current che va a finire in prev
...
alla fine ritorna 5


const funzioneReduce = (prev,current) => {
  return current
}

var elemento = myArray.reduce(funzioneReduce)

//somma di elementi nell'array
[1,2,3,4] 
const funzioneReduce = ((prev,current) => {
  return current + prev
},0)

var elemento = myArray.reduce(funzioneReduce)

1) elemento 1
prev = 0
current = 1
la funzione ritorna current + prev = 1 che va a finire in prev
2) elemento 2
prev = 1
current = 2
la funzione ritorna current + prev = 3 che va a finire in prev
4) elemento 3
prev = 3
current = 3
la funzione ritorna current + prev = 6 che va a finire in prev
4) elemento 4
prev = 6
current = 4
la funzione ritorna current + prev = 10 che va a finire in prev
alla fine reduce ritorna 10


//voglio trovare il max
[1,7,3,4,10] 
const funzioneReduce = (prev,current) => {
  current > prev ? current : prev
}

var elemento = myArray.reduce(funzioneReduce)
1) elemento 1
prev = 1
current = 1
la funzione ritorna  current > prev ? current : prev => 1 che va a finire in prev
2) elemento 7
prev = 1
current = 7
la funzione ritorna  current > prev ? current : prev => 7 che va a finire in prev
3) elemento 3
prev = 7
current = 3
la funzione ritorna  current > prev ? current : prev => 7 che va a finire in prev
4) elemento 4
prev = 7
current = 4
la funzione ritorna  current > prev ? current : prev => 7 che va a finire in prev
4) elemento 10
prev = 7
current = 10
la funzione ritorna  current > prev ? current : prev => 10 che va a finire in prev
prev alla fine vale 10 che è il max

*/

//se sei in ambiente nodeJS => const menu = require("./menu.json")
//se sei in react => import {menu} from "./menu.json"
//utilizzi un npm che si chiama require.js
//utilizzare le fetch

var menuCibi;
var myString = "hello world sfnsdofnads fsdjfd0isdfj sd0fjsdoifns df0sdnf0";
window.onload = async () => {
  console.log("loaded");
  menuCibi = await getCibi(); //ho "importato" i dati presenti sul json
  display(menuCibi);
  mediaVoti(menuCibi);
  console.log(maxDeiNumeri(4, 6, 7, 8, 11, 77, 1));
  console.log(
    maxDeiNumeriPari(4, 6, 7, 8, 11, 77, 1, 6, 8, 66, 3, 2, 88, 1660)
  );
  console.log(studentiChePassanoIlTest(85));
  console.log(sostituisciVocali(myString));
};

const getCibi = async () => {
  let resp = await fetch("./menu.json");
  let json = await resp.json();
  return json;
};

const display = cibi => {
  console.log(cibi);
};

//EXTRA media dei voti nell'array finale (usa reduce)

const mediaVoti = (menu = menuCibi) => {
  let arrayFinale = [];
  //faccio il map del json (array di oggetti) e se il campo comments ha elementi
  let arrayDiRating = menuCibi.map(current => {
    if (current.comments.length > 0) {
      // e se il campo comments ha elementi
      //faccio il map di quegli elementi (che sono sempre oggetti)
      //ed estraggo solo il campo rating
      return current.comments.map(currentComment => currentComment.rating);
    } else return [];
  }); //[[],[],[]] avrò quindi un array fatto di altri array contenenti il campo rating
  //per avere un array fatto di numeri
  //faccio un ciclo su ogni elemento di arrayDiRating
  arrayDiRating.forEach(current => {
    arrayFinale = [...arrayFinale, ...current]; //e creo il mio array finale fatto solo di numeri
  });
  console.log(arrayFinale);
  let sommaDeiRating = arrayFinale.reduce((prev, current) => prev + current, 0);
  let media = sommaDeiRating / arrayFinale.length;
  console.log(media);
};

/* 

arrayDiRating = [[5,5],[4],[5,5],[1,2,5]]
arrayFinale = []

arrayDiRating.forEach(current => { 
    arrayFinale = [...arrayFinale, ...current]; //e creo il mio array finale fatto solo di numeri
  });

1)Giro :
arrayFinale = [] //precedente
current = [5,5]
arrayFinale = [5,5] [...arrayFinale, ...current]
2)Giro :
arrayFinale = [5,5] //precedente
current = [4]
arrayFinale = [5,5,4] [...arrayFinale, ...current]
3)Giro :
arrayFinale = [5,5,4] //precedente
current = [5,5]
arrayFinale = [5,5,4,5,5] [...arrayFinale, ...current]
ecc..
*/

//max in un array di numeri con rest
//il rest operator (lo spread nei parametri) prende tutti gli i parametri non utilizzati e li mette in un array
maxDeiNumeri = (...numeri) =>
  (max = numeri.reduce(
    (prev, current) => (prev > current ? prev : current),
    0
  ));

//max dei numeri pari da un array

maxDeiNumeriPari = (...rest) => {
  let arrayDiPari = rest.filter(current => current % 2 === 0);
  return arrayDiPari.reduce((prev, current) =>
    prev > current ? prev : current
  );
};

//students che passano il test
//deve ritornare un array di nomi di studenti che passano il test dato una soglia minima

var students = [
  {
    name: "corey",
    score: 89
  },
  {
    name: "rachel",
    score: 95
  },
  {
    name: "alex",
    score: 91
  },
  {
    name: "michelle",
    score: 81
  },
  {
    name: "jessica",
    score: 81
  }
];

studentiChePassanoIlTest = sogliaMinima =>
  students
    .filter(current => current.score > sogliaMinima)
    .map(current => current.name);

//sostituisci le vocali con #
sostituisciVocali = str => {
  let stringArray = str.split("");
  let vocali = "aeiou";
  let senzaVocali = stringArray.map(current => {
    return vocali.indexOf(current) !== -1 ? "#" : current;
  });
  return senzaVocali.join("");
};
