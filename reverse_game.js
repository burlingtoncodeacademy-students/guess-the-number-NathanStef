const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// function to ask a question and return the user's input
function ask(questionText) {
return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
});
}

// function to generate a random number between min and max 
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to start the game
start();

async function start() {
console.log("Welcome to the Number Guessing Game!");
console.log("I (computer) have picked a number between 1 and 100.");
console.log("Your goal is to guess the correct number. Let's begin!");

  const secretNum = generateRandomNumber(1, 100); // generate a random secret number

let guess = await ask("Guess a number between 1 and 100: ");
guess = parseInt(guess);

  let attempts = 1; // number of attempts made by the user

while (guess !== secretNum) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
    console.log("Invalid input. Please enter a number between 1 and 100.");
    } else if (guess < secretNum) {
    console.log("Too low! Guess a higher number.");
    } else {
    console.log("Too high! Guess a lower number.");
    }

    guess = await ask("Guess again: ");
    guess = parseInt(guess);

    attempts++; // increment the number of attempts
}

    console.log("Congrats! You guessed the correct number " + secretNum + " in " + attempts + " attempts.");
  rl.close(); // close the readline interface
  process.exit(); // exit process
}
