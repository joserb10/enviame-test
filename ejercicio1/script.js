function primeNumbersBetween(rangoInferior, rangoSuperior) {
    const arrayNumbers = Array.from(makeArray(rangoInferior,rangoSuperior));
    console.log(arrayNumbers);

    const arrayPrimeNumbers =  arrayNumbers.filter(number => isPrime(number));
    console.log(arrayPrimeNumbers);
}

function* makeArray(inf, sup) {
    while (inf+1 < sup) {
      yield inf+1;
      inf += 1;
    }
}

function isPrime(number) {
    for (var i = 2; i < number; i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return number !== 1;
}
  
window.onload = (event) => {
    primeNumbersBetween(5,8);
};