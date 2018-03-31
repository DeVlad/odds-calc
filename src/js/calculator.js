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

// Minus moneyline odds into implied probability
// Implied probability 	= ( - ( 'minus' moneyline odds ) ) / ( - ( 'minus' moneyline odds ) ) + 100
// (- (-120) / ( (- (-120) ) + 100) = 120 / 220	= 0.545 * 100 = 54.55%

function minusMoneylineToIp(minusMoneyline) {
    return ((-(minusMoneyline) / ((-(minusMoneyline)) + 100)) * 100).toFixed(2);
}

// Plus moneyline odds into implied probability
// Implied probability 	= 	100 / ( 'plus' moneyline odds + 100 )
// ( 100 / 180 + 100 ) 	= 	100 / 280 	= 	0.357 * 100	= 35.7%

function plusMoneylineToIp(plusMoneyline) {
    return (100 / (plusMoneyline + 100) * 100).toFixed(2);
}

// Implied probability into decimal odds
// Decimal Odds = 100 / implied probability
// 100 / 75 = 1.33

function ipToDecimal(impliedProbability) {
    return (100 / impliedProbability).toFixed(2);
}

// Implied probability (50% and above) into moneyline odds
// Moneyline Odds 	=  - ( implied probability / (100 - implied probability)) x 100
// - (75 / (100 – 75)) x100 	= 	- (75 / 25) x 100 	= 	- 3 x 100 	= 	- 300
// Implied probability (below 50%) to moneyline odds:
// Moneyline odds 	= 	(100 - implied probability / implied probability ) x 100
// ((100 - probability)/(probability) x 100) 	= 	((75) / (25) x 100) 	= 	3 x 100  = 	300

function ipToMoneyline(impliedProbability) {
    if (!impliedProbability) {
        return 0;
    }
    if (typeof impliedProbability === "string") {
        impliedProbability = Number(impliedProbability.replace(/[^0-9]/g, ''));
    }
    if (impliedProbability < -400 || impliedProbability > 400 || impliedProbability === 0) {
        return 0;
    }

    return impliedProbability > 50 ? (-(impliedProbability / (100 - impliedProbability)) * 100).toFixed() : ((100 - impliedProbability) / (impliedProbability) * 100).toFixed();
}

console.log("decimal to implied", decimalToIp(1.65));
console.log("fractional to implied", fractionalToIp('5/2'));
console.log("minus moneyline to implied", minusMoneylineToIp(-120));
console.log("plus moneyline to implied", plusMoneylineToIp(180));
console.log("implied probability to decimal", ipToDecimal(75));
console.log("Implied probability (50% and above) to moneyline", ipToMoneyline(75));
console.log("Implied probability (bellow 50%) to moneyline", ipToMoneyline(25));
