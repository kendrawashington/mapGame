//Designated Pairs
const cityCountryPairs = 9;
let answers = [];

//UI variables
const finalSubmitButton = document.getElementById('finalSubmit');
const capitalTiles = document.querySelector('.capitalTiles');
const countryCards = document.querySelector('.countryCards');
const newCitiesButton =  document.getElementById('newSet');

//Event Listeners



    document.addEventListener('DOMContentLoaded', createGamePieces);
    finalSubmitButton.addEventListener('click', checkAnswers);
    newCitiesButton.addEventListener('click', createGamePieces);
    document.querySelector('.playAgainButton').addEventListener('click', playAgain);


//Get Country by Capital City json and parse it into an array



//Event listeners to populate at the beginning of a game or when get new capital city set button pressed

//When play again pressed, reset game


//HELPER FUNCTIONS
//Check Answers

function checkAnswers(){
     
    //Get Array of capital names that were placed
    let userAnswers = []; 
    let answersCorrect = 0;
    for (let index = 0; index < cityCountryPairs; index++) {
        let userAnswerID = `.country${index}`;

        userAnswers[index] = document.querySelector(userAnswerID).firstElementChild.textContent;

        if (userAnswers[index] ==answers[index]){
            answersCorrect++;
        }

       // setHighlights(index, userAnswers[i] === answers[i], userAnswerID);
    }
    //Disable Buttons
    //disableButtonsAndTiles();
    setHeaderMessage(answersCorrect);
    
}

function setHeaderMessage(count){
    let headerMessage = '';
    let subMessage
    const percent = count/cityCountryPairs;

    if (percent < .25){
        headerMessage = 'Couch Potato';
        subMessage = 'Do you even know where you live?';
    } else if (percent >= .25 && percent < .5){
        headerMessage = 'Homebody';
        subMessage = 'Don\'t get around much do you?';
    } else if (percent >= .5 && percent < 1){
        headerMessage = 'Tourist';
        subMessage = 'You\'ve seen a few places';
    } else {
        headerMessage = 'Globetrotter';
        subMessage = '\'Travel\' is your middle name';
    }

    document.querySelector('.heading').textContent = `Status: ${headerMessage}`;
    document.querySelector('.submessage').textContent = subMessage;

    document.querySelector('.playAgain').style.display = "block";

}

//Refresh page for a new game
function playAgain(){
    location.reload();
}
//Set Up
function createGamePieces(e){
    

    getCityCountryPairs().then( data => {
         let randomNums = getSetOfRandomizedValues(cityCountryPairs, data.length);
        
        
        let gamePieces = setInnerHTML(data, randomNums);

        capitalTiles.innerHTML = gamePieces.cTiles;

        countryCards.innerHTML = gamePieces.cCards;

    });

}

//Get City Country Pairs
async function getCityCountryPairs() {
    let response = await fetch('node_modules/country-json/src/country-by-capital-city.json')
    let data = await response.json();
    return data;
}

//Get set of randomized numbers with no duplicates
function getSetOfRandomizedValues(setLength, rangeLength) {
    let randomSet = new Set();

    while (randomSet.size < setLength) {
        randomSet.add(Math.floor(Math.random()*rangeLength));
    }

    return randomSet;

}

//Create InnerHTML of capitalTiles and countryCards
function setInnerHTML(array, randomNumSet) {

    let cTiles = '';
    let cCards = '';

    let randomNumSetArray = Array.from(randomNumSet);

    //Define Order Answers should be in with following array and add to innerHTML at the same time

    
    randomNumSetArray.forEach( function(randomNum, i){
        if (array[randomNum].city === null){
            cTiles +=
            `<span class="badge badge-dark capital" id="capital${i}" draggable="true">No Capital</span>`;
            answers[i] = 'No Capital';
        } else {
        cTiles +=
        `<span class="badge badge-dark capital" id="capital${i}" draggable="true">${array[randomNum].city}</span>`;
        answers[i]=array[randomNum].city;
        }

        cCards += `<div class="col-sm-4">
        <div class ="card my-1">
            <div class = "card-body">
                <h5 class="card-title text-info">
                    ${array[randomNum].country}
                </h5>
                <div class="card-text border border-secondary text-secondary text-center py-2 country country${i}"> 
                </div>
            </div>
        </div>
    </div>`;
    });

    return {cTiles, cCards};
}