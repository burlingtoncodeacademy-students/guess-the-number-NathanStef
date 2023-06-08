const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// function to ask a question and return the user's input
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// function to start the game
start();

async function start() {
  // intro message
  console.log("Let's play a game where you (human) think of a number and I (computer) try to guess it.");

  let minGuess = 1; // minimum possible guess
  let maxGuess = 100; // maximum possible guess

  // ask the user to think of a number and wait for their confirmation
  let secretNumber = await ask("Think of a number between 1 and 100, and let me know when you're ready.\nPress Enter to continue...");

  let attempts = 0; // number of attempts made by the bot

  while (true) {
    let guess = Math.floor((minGuess + maxGuess) / 2); // guess the middle number between minGuess and maxGuess
    attempts++; // number of attempts

    let response = await ask("Is your number " + guess + "? (yes/no)\n"); // ask if guessed number is correct

    if (response.toLowerCase() === 'yes') { // correct guess
      console.log("Woohoo! I guessed it! Your number is " + guess); // victory message
      break; // exit the loop
    } else if (response.toLowerCase() === 'no') { // incorrect guess
      let highOrLow = await ask("Is your number higher or lower than " + guess + "?\n"); // is number higher or lower?
      // cheat detected, can't be higher
      if (highOrLow.toLowerCase() === 'higher') { // higher than guess 
        if (minGuess > guess) {
          console.log("Oops! Your response contradicts your earlier statement. You said it was lower than " + guess + ", so it can't also be higher than " + (guess - 1) + "!");
          continue;
        }
        minGuess = guess + 1; // set number to a greater min if guess is higher
      } else if (highOrLow.toLowerCase() === 'lower') { // lower than guess
        if (maxGuess < guess) {
          // cheat detected, can't be lower
          console.log("Oops! Your response contradicts your earlier statement. You said it was higher than " + guess + ", so it can't also be lower than " + (guess + 1) + "!");
          continue;
        }
        maxGuess = guess - 1; // set number to a lesser max if guess is lower
      } else {
        console.log("Invalid response. Please enter 'higher' or 'lower'."); // error for invalid input 
        continue;
      }
    } else {
      console.log("Invalid response. Please enter 'yes' or 'no'."); // error for invalid input 
      continue;
    }

    if (attempts >= 7) { // max number of attempts 
      console.log("Oops! I reached the maximum number of attempts. You win!"); // error for max num of attempts  
      break; // exit loop
    }
  }

  rl.close(); // close the readline interface
  process.exit(); // exit process
}