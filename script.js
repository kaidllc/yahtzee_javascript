const dices = document.getElementsByClassName('dice').innerHTML;
const part2 = document.getElementsByClassName('part2');
let resultValues = null;
let diceArray = [];
let timesNum = {}

//function to calculate total number of eyes in one throw
function totalFiveDice(resultValues) {
    // TODO :: .reduce() method toepassen
    total = 0
    for (let z=0; z<6; z++) {
        total += (z+1) * resultValues[z]
    }
    return total
}

function reset() {
    resultValues = null;
    diceArray = [];
    timesNum = {}
    document.getElementById("rollDice").innerText = "Gooien";
    document.getElementById("rollDice").onclick = playGame;

    let items = document.getElementsByClassName('score1');
    for (let i = 0; i < items.length; i++ ) {
        items[i].innerHTML = null;}

    let diceValues = document.getElementsByClassName('dice');
    for (let j = 0; j < diceValues.length; j++ ) {
        diceValues[j].innerHTML = null;}
}

function playGame() {
    rollDice();
    calculateScores();
    calculateTotalScores();
}

function rollDice() {
    // create array of thrown numbers (8)
    for (let i=0; i < 5; i++) {
        let randomNumber = Math.floor(Math.random()*6)+1;
        console.log(randomNumber);
        diceArray.push(randomNumber);
    }

    for (let i=0; i<5; i++) {
        let id= "dice" + (i+1)
        console.log('id = ' + id)
        document.getElementById(id).innerHTML = diceArray[i]
    }

    console.log("diceArray = " + diceArray)
    console.log(document.getElementById("dice5").innerHTML = diceArray[4])

    //create object from array with key = num, value = timesNum
    for (let j=1; j<7; j++) {
        timesNum[j] = diceArray.filter(num => num===j).length;
    }

    console.log("object", timesNum)
    resultValues = Object.values(timesNum)

    document.getElementById("rollDice").innerText = "Reset";
    document.getElementById("rollDice").onclick = reset;
}

function calculateScores() {
    // TODO :: over het timesNum object lopen met forin
    for (num in resultValues) {
    // is this possible, and if so; how??
    }
    
    //calculate possible scores in upper part
    document.getElementById("eenSpel1").innerHTML = resultValues[0];
    document.getElementById("tweeSpel1").innerHTML = resultValues[1] * 2;
    document.getElementById("drieSpel1").innerHTML = resultValues[2] * 3;
    document.getElementById("vierSpel1").innerHTML = resultValues[3] * 4;
    document.getElementById("vijfSpel1").innerHTML = resultValues[4] * 5;
    document.getElementById("zesSpel1").innerHTML = resultValues[5] * 6; 
    
    //three of a kind / four of a kind / yathzee / fullhouse
    document.getElementById("3ofakind1").innerHTML = xOfAKind(3) || xOfAKind(4) || xOfAKind(5)  ? totalFiveDice(resultValues) : 0;
    document.getElementById("4ofakind1").innerHTML = xOfAKind(4) || xOfAKind(5) ? totalFiveDice(resultValues) : 0;
    document.getElementById("yathzee1").innerHTML = xOfAKind(5) ? 50 : 0;
    document.getElementById("fullHouse1").innerHTML = (xOfAKind(3) && xOfAKind(2))  ? 25 : 0; 

    //Kleine straat & grote straat
    diceArray.sort();
    document.getElementById("kleineStraat1").innerHTML = (/1234|2345|3456/.test(diceArray.join("").replace(/(.)\1/,"$1"))) ? 30 : 0;
    document.getElementById("groteStraat1").innerHTML = (/12345|23456/.test(diceArray.join("").replace(/(.)\1/,"$1"))) ? 40 : 0;
    
    //Chance
    document.getElementById("chance1").innerHTML = totalFiveDice(resultValues)

    //total points upper part
    document.getElementById("totalUpperPartDown1").innerHTML = document.getElementById("totalUpperPartWithBonus1").innerHTML
}


function calculateTotalScores() {
    //total upper part 
    document.getElementById("totalUpperPart1").innerHTML  = diceArray.reduce((a, b) => a + b, 0)
    document.getElementById("totalUpperPartDown1").innerHTML  = diceArray.reduce((a, b) => a + b, 0)
    
    //bonus & total upper part including bonus
    if (document.getElementById("totalUpperPart1").innerHTML > 63) {
        document.getElementById("bonus1").innerHTML = 35
        document.getElementById("totalUpperPartWithBonus1").innerHTML = document.getElementById("totalUpperPart1").innerHTML + document.getElementById("bonus1").innerHTML
    }
    else {
        document.getElementById("bonus1").innerHTML = 0
        document.getElementById("totalUpperPartWithBonus1").innerHTML = document.getElementById("totalUpperPart1").innerHTML
    }

    //total points lower part
    let totalPart2 = 0;
    for (let p=0; p<part2.length; p++) {
        totalPart2 += Number(part2[p].innerHTML)
    }
    document.getElementById('totalLowerPart1').innerHTML = totalPart2
   
    //total general
    document.getElementById('totalGeneral1').innerHTML = Number(document.getElementById('totalLowerPart1').innerHTML) + Number(document.getElementById("totalUpperPartDown1").innerHTML)
    
}

function xOfAKind(value){
    return resultValues.filter(num => num === value).length ? true : false
}



