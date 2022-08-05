function primeNumbersBetween() {
    const rangoInferior = document.getElementById("inf").value;
    const rangoSuperior = document.getElementById("sup").value;
    console.log(rangoInferior)
    console.log(rangoSuperior)
    const arrayNumbers = Array.from(makeArray(rangoInferior,rangoSuperior));
    console.log(arrayNumbers);

    const arrayPrimeNumbers =  arrayNumbers.filter(number => isPrime(number));
    console.log(arrayPrimeNumbers);

    renderPrimesHtml(arrayPrimeNumbers);
}

function* makeArray(inf, sup) {
    for (let i = inf; i+1 < sup; i++) {
      yield parseInt(i) + 1;     
    }
}

function isPrime(number) {
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return number !== 1;
}

function renderPrimesHtml(arrayPrimeNumbers) {
    const divContainer = document.querySelector('#container-primes');
    arrayPrimeNumbers.forEach(prime => divContainer.append(prime+" . "));
}
