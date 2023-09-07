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


voice.addEventListener('click', () => {
    let speechVoice = new SpeechSynthesisUtterance(enWord.innerHTML)
    speechSynthesis.speak(speechVoice)
});

searchBtn.addEventListener('click', dictionary);