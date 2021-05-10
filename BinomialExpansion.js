function factorialRecursive(n) {
  let s = 1;
  while (n > 1) {
    s *= n;
    n--;
  }
  return s;
}

function factorialDivision(up, down) {
  const factorial =
    factorialRecursive(up) /
    (factorialRecursive(down) * factorialRecursive(up - down));
  return factorial;
}

function readableBinomio(bin, v) {
  const mapObj = {
    [`-1${v}`]: "-" + v,
    [`+1${v}`]: "+" + v,
  };
  bin = bin.replace(/[a-z]\^0/gi, "");
  bin = bin.replace(/[a-z]\^1/gi, v);
  bin = bin.replace(/[+-]1{1}[a-z]/gi, (matched) => mapObj[matched]);
  return bin.replace(/^\+/gi, "");
}

function binomialExpansion(binomio, k = 0, result = "") {
  const [bin, potencia] = binomio.split(")^");
  const replaceBinomio = bin.replace(/[ ^ ( ) ]/g, "");
  const [variable] = replaceBinomio.match(/[a-zA-Z]/g);
  let [multiplier, number] = replaceBinomio.split(/[a-zA-z]/g);
  multiplier = !parseInt(multiplier) ? multiplier + 1 : multiplier;
  if (k > potencia) {
    return readableBinomio(result, variable);
  }

  let coefficient =
    factorialDivision(potencia, k) *
    Math.pow(parseInt(number | 0), k) *
    Math.pow(parseInt(multiplier | 0), potencia - k);

  const value = `${
    coefficient > 0 ? "+" + coefficient : coefficient
  }${variable}^${potencia - k}`;
  const addResult = `${result}${coefficient != 0 && value}`;
  const newk = k + 1;

  return binomialExpansion(binomio, newk, addResult);
}
console.log("resultado:", binomialExpansion("(2x+3)^8")); //256x^8+3072x^7+16128x^6+48384x^5+90720x^4+108864x^3+81648x^2+34992x+6561
console.log("resultado:", binomialExpansion("(p-1)^3")); // p^3-3p^2+3p-1"
console.log("resultado:", binomialExpansion("(2f+4)^6")); // returns "64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096"
console.log("resultado:", binomialExpansion("(-2a-4)^0")); // returns "1"
console.log("resultado:", binomialExpansion("(-12t+43)^2")); // returns "144t^2-1032t+1849"
console.log("resultado:", binomialExpansion("(r+0)^203")); // returns "r^203"
console.log("resultado:", binomialExpansion("(x-1)^2")); // returns "x^2+2x+1"

console.log("resultado:", binomialExpansion("(x+1)^1")); // returns "x+1"
console.log("resultado:", binomialExpansion("(x-1)^1")); // returns "x-1"
console.log("resultado:", binomialExpansion("(-2k-3)^3")); // returns ""-8k^3-36k^2-54k-27""
