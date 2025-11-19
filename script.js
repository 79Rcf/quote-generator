const joke = document.querySelector(".joke");
const textLeft = document.querySelector(".text-left");
const textRight = document.querySelector(".text-right");
const mainText = document.querySelector(".main-text");
const lastText = document.querySelector(".last-text"); 
const btn = document.querySelector(".btn");  
const btn1 = document.querySelector(".btn1"); 

let apiJokes = [];
let currentJokeIndex = 0;

btn.addEventListener("click", previousJoke); 
btn1.addEventListener("click", nextJoke);   

function nextJoke() {
    if (apiJokes.length === 0) {
        showError("No jokes loaded yet");
        return;
    }
    currentJokeIndex = (currentJokeIndex + 1) % apiJokes.length; 
    displayCurrentJoke();
}

function previousJoke() {
    if (apiJokes.length === 0) {
        showError("No jokes loaded yet");
        return;
    }
    currentJokeIndex = (currentJokeIndex - 1 + apiJokes.length) % apiJokes.length; 
    displayCurrentJoke();
}

function displayCurrentJoke() {
    const jokes = apiJokes[currentJokeIndex];
    
    textLeft.textContent = jokes.category; 
    textRight.textContent = jokes.type;


    if (jokes.type === "twopart") {
        mainText.textContent = jokes.setup;
        lastText.textContent = jokes.delivery;
    } else if (jokes.type === "single") {
        mainText.textContent = jokes.joke;
        lastText.textContent = "";
    } else {
        showError("Unknown joke type");
    }


    if (mainText.textContent.length > 120) {
        mainText.classList.add("long-jokes");
    } else {
        mainText.classList.remove("long-jokes");
    }
}

function showError(message) {
    mainText.textContent = message;
    lastText.textContent = "";
    textLeft.textContent = "Error";
    textRight.textContent = "";
}

async function getJokes() {
    try {
        let url = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?amount=10';
        let response = await fetch(url);
        let data = await response.json(); 
        apiJokes = data.jokes;
        
        if (apiJokes.length > 0) {
            currentJokeIndex = 0;
            displayCurrentJoke(); 
        } else {
            showError("No jokes found");
        }
        
    } catch (error) {
        console.log('Error:', error);
        showError("Failed to load jokes");
    }  
}

getJokes();