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


const dictionary = () => {
    let inValue = inpWord.value;
    if (inValue) {
        resultSec.style.display = "none"

        fetchData(inValue);
    
        inpWord.value = "";
    }else {
        wait.style.display = "block"
        wait.innerHTML = "Please Enter a Word..."
    }
};

function fetchData(inValue) {
    wait.style.display = "block"
    wait.innerHTML = "Waiting..."
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inValue}`).then(res => res.json())
        .then(result => {
            let { word, phonetic, meanings } = result[0]
            let { definitions } = result[0].meanings[0]

            enWord.innerHTML = word
            pronouns.innerHTML = phonetic
            details.innerHTML = meanings[0].partOfSpeech
            wordMeaning.innerHTML = definitions[0].definition

            if (definitions[0].example == undefined) {
                wordExample.innerHTML = "There is no Example for this word in our Dictionary."
            } else {
                wordExample.innerHTML = definitions[0].example
            }

            resultSec.style.display = "block";
            wait.style.display = "none"
        })
}

voice.addEventListener('click', () => {
    let speechVoice = new SpeechSynthesisUtterance(enWord.innerHTML)
    speechSynthesis.speak(speechVoice)
});

searchBtn.addEventListener('click', dictionary);