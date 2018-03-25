/* Odds calculator */


// Decimal odds to implied probability
// Implied probability 	= 	1 / "Decimal Odds"
// 1 / 1.65 	= 	0.606 	* 100 = 	60.61%

function decimalToIp(decimal) {
    return ((1 / decimal) * 100).toFixed(2);
}

// Fractional odds into implied probability
// Implied probability 	= 	denominator / (denominator + numerator)
// 5 / 2 	= 	2 / (2 + 5) 	= 	2 / 7 	= 	0.2857 * 100	= 28.57%

function fractionalToIp(fractional) {
    var f = fractional.split('/');
    var numerator = Number(f[0]);
    var denominator = Number(f[1]);
    return ((denominator / (denominator + numerator)) * 100).toFixed(2);
}

console.log("decimal to implied", decimalToIp(1.65));
console.log("fractional to implied", fractionalToIp('5/2'));
