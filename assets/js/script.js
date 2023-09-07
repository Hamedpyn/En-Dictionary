// * Developer : @HAMEDPYN
// * Version : 1.0
// * Date : 08 / 10 / 2023

// * Description : This is a simple program that will help you to get the the words meaning and its definitions, It also tells how to pronounce it and you can Listen it

// Select DOM Elements

const searchBtn = document.querySelector("#search-btn");
const inpWord = document.querySelector("#inp-word");
const voice = document.querySelector(".word button");
const enWord = document.querySelector(".word h3");
const details = document.querySelector(".details").children[0];
const pronouns = document.querySelector(".details").children[1];
const wordMeaning = document.querySelector('.word-meaning');
const wordExample = document.querySelector(".word-example");
const resultSec = document.querySelector("#result");
const wait = document.querySelector("#wait");


// Function to handle the dictionary lookup
const dictionary = () => {
    // Get the input value
    let inValue = inpWord.value;
    // if it's not empty 
    if (inValue) {
        resultSec.style.display = "none";

        fetchData(inValue);

        // empty the input value
        inpWord.value = "";
    } else {
        // if it's empty , show an alert text
        wait.style.display = "block";
        wait.innerHTML = "Please Enter a Word...";
    }
};

// Function to fetch data from the dictionary API
function fetchData(inValue) {
    wait.style.display = "block";
    wait.innerHTML = "Waiting...";

    // Make a GET request to the dictionary API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inValue}`)
        .then(res => res.json()) // Parse the response as JSON
        .then(result => {
            // Extract relevant data from the response
            let { word, phonetic, meanings } = result[0];
            let { definitions } = result[0].meanings[0];

            // Display the word, pronunciation, part of speech, and definition
            enWord.innerHTML = word;
            pronouns.innerHTML = phonetic;
            details.innerHTML = meanings[0].partOfSpeech;
            wordMeaning.innerHTML = definitions[0].definition;

            // Display the example if available, or a message if not
            if (definitions[0].example == undefined) {
                wordExample.innerHTML = "There is no Example for this word in our Dictionary.";
            } else {
                wordExample.innerHTML = definitions[0].example;
            }

            // Show the result section and hide the loading message
            resultSec.style.display = "block";
            wait.style.display = "none";
        });
}

// Add a click event listener to the "voice button ( SPEAKER )"
voice.addEventListener('click', () => {
    // Create a new SpeechSynthesisUtterance object with the content of enWord.innerHTML
    let speechVoice = new SpeechSynthesisUtterance(enWord.innerHTML);

    // Use the speechSynthesis API to speak the speechVoice
    speechSynthesis.speak(speechVoice);
});

// Add a click event listener to the search button
searchBtn.addEventListener('click', dictionary);