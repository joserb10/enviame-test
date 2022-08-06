/*Función para obtener los números primos dentro de un rango de números*/
function primeNumbersBetween() {

    //Obtener los valores de los input inferior y superior
    const rangoInferior = document.getElementById("inf").value;
    const rangoSuperior = document.getElementById("sup").value;

    //Crear un array con todos los números que estén dentro del rango
    const arrayNumbers = Array.from(makeArray(rangoInferior,rangoSuperior));

    //Filtrar los números que cumplan la condición de ser primos
    const arrayPrimeNumbers =  arrayNumbers.filter(number => isPrime(number));

    //Mostrar los primos en el html
    renderPrimesHtml(arrayPrimeNumbers);
}

/*Función generadora para crear la lista de números dentro del rango*/
function* makeArray(inf, sup) {
    for (let i = inf; i+1 < sup; i++) {
      yield parseInt(i) + 1;     
    }
}

/*Función para validar que un número sea primo o no*/
function isPrime(number) {
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return number !== 1;
}

/*Función para renderizar los números primos dentro del div #container-primes*/
function renderPrimesHtml(arrayPrimeNumbers) {
    const divContainer = document.querySelector('#container-primes');
    divContainer.empty();
    arrayPrimeNumbers.forEach(prime => divContainer.append(prime+" . "));
}
