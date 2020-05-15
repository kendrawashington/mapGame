//UI variables
const capitalBar = document.querySelector('.capitalTiles')
const submitButton = document.getElementById('submit');

//Set Up an Event Listener for all Draggable Items (From Capital Bar to Country Cards)
document.querySelector('.capitalTiles').addEventListener("dragstart", dragStart);
document.querySelector('.countryCards').addEventListener("dragover", allowDrop);
document.querySelector('.countryCards').addEventListener("drop", drop);

//Event Listeners that callow movement between country cards
document.querySelector('.countryCards').addEventListener("dragstart", dragStart);

//Allow Capitals to be placed back on capital bar
document.querySelector('.capitalTiles').addEventListener("dragover", allowDrop);
document.querySelector('.capitalTiles').addEventListener("drop", drop);

//Set Data to be moved during drag event
function dragStart(e) {
    if(e.target.classList.contains('capital')){
        e.dataTransfer.setData("text/plain", e.target.id);
    }
}

//Allow drop behavior within Country Card if there is no Capital Tile there currently
function allowDrop(e){
    if ((e.target.classList.contains("country") && e.target.firstElementChild === null)|| e.target.classList.contains("capitalTiles")){
    e.preventDefault();
    }
}


//Retrieve the new data to be placed within the new Section
function drop(e) {

    if ((e.target.classList.contains("country") && e.target.firstElementChild === null) || e.target.classList.contains("capitalTiles")){
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
        
    }

    if (capitalBar.firstElementChild === null) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}