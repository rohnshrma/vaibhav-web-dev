let score = 0;
const totalQuestions = 5;

function show_title() {
  alert(
    "\n===========================\n      QUIZ APP      \n===========================\n"
  );
}

// show_title();

function show_rules() {
  alert(`\nQuiz Rules :
\n1. Total Questions ${totalQuestions}
\n2. Each correct answer gives 1 point
\n3. Options are A, B, C, D
`);
}

function askQuestion(question, options, correctAnswer) {
  let userAnswer;
  let choices = ["A", "B", "C", "D"];

  let displayQuestion = question + "\n\n";
  for (let i = 0; i < options.length; i++) {
    displayQuestion += choices[i] + ". " + options[i] + "\n";
  }
  //   alert(displayQuestion);

  while (true) {
    userAnswer = prompt(
      `${displayQuestion}\n\nEnter A | B | C | D`
    ).toUpperCase();

    if (!userAnswer) continue;

    if (!["A", "B", "C", "D"].includes(userAnswer)) {
      alert("Please Choose Between A | B | C | D");
      continue;
    }

    if (userAnswer === correctAnswer) {
      alert("✅ Correct Answer");
      score++;
    } else {
      alert(`❌Wrong Answers! Correct Answer is ${correctAnswer}`);
    }

    break;
  }
}

function question1() {
  askQuestion(
    "who is prime minister of india ?",
    ["Amit Shah", "Narendra Modi", "Rahul Gandhi", "Arvind Kejriwal"],
    "B"
  );
}
function question2() {
  askQuestion(
    "who is home minister of india ?",
    ["Amit Shah", "Narendra Modi", "Rahul Gandhi", "Arvind Kejriwal"],
    "A"
  );
}
function question3() {
  askQuestion(
    "who is president of united states of america ?",
    ["J F Keneddy", "Barak Obama", "Donald Trump", "Arvind kejriwal"],
    "C"
  );
}

function question4() {
  askQuestion(
    "Which gas do humans inhale?",
    ["Carbon Dioxide", "Oxygen", "Methane", "Uranium"],
    "B"
  );
}

function question5() {
  askQuestion(
    "5.) Who is Johnny Lever?",
    ["Artist", "Singer", "Actor", "Director"],
    "C"
  );
}

function startQuiz() {
  let questions = [question1, question2, question3, question4, question5];
  for (let question of questions) {
    question();
  }
}

function showResult() {
  let result = `Your Final Score : ${score} / ${totalQuestions}\n\n`;

  if (score === totalQuestions) {
    result += "Performance : Excellent";
  } else if (score > totalQuestions / 2) result += "Performance : Good";
  else result += "Performance : Try Hard";
  alert(result);
}

function playAgain() {
  let playAgain = prompt("Do you want to play again ? (yes/no)").toLowerCase();
  if (playAgain === "yes") {
    score = 0;
    main();
  }
}

function main() {
  show_title();
  show_rules();
  startQuiz();
  showResult();
  playAgain();
}

main();
