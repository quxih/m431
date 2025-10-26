const quizKatze = [
    { question: "Wie nennt man eine männliche Katze?", answers: ["Kätzchen","Kater","Mieze","Stubentiger"], correct:1 },
    { question: "Welche dieser Katzenrassen hat kein Fell?", answers: ["Perser","Maine Coon","Sphynx","Britisch Kurzhaar"], correct:2 },
    { question: "Wie viele Leben sagt man, haben Katzen sprichwörtlich?", answers: ["5","7","9","11"], correct:2 },
    { question: "Warum schnurren Katzen?", answers: ["Nur bei Angst","Nur bei Schmerzen","Bei Zufriedenheit","Zum Jagen"], correct:2 },
    { question: "Was ist die bekannteste Katzenrasse der Schweiz?", answers: ["Europäische Hauskatze","Maine Coon","Britisch Kurzhaar","Bengal"], correct:0 },
    { question: "Wie kommunizieren Katzen hauptsächlich?", answers: ["Mit Bellen","Mit Körpersprache","Mit Gesten","Mit Zwitschern"], correct:1 },
    { question: "Was ist typisch für eine Maine-Coon-Katze?", answers: ["Kurzes Fell","Keine Schnurrhaare","Sehr langes Fell","Keine Krallen"], correct:2 },
    { question: "Welche Farbe hat die Zunge einer normalen Hauskatze?", answers: ["Rosa","Blau","Schwarz","Weiß"], correct:0 },
    { question: "Wie schnell können Katzen rennen?", answers: ["Bis zu 48 km/h","Bis zu 50 km/h","Bis zu 32 km/h","Bis zu 45 km/h"], correct:3 },
    { question: "Was bedeutet es, wenn eine Katze ihren Schwanz aufrecht trägt?", answers: ["Sie ist freundlich","Sie has Angst","Sie ist wütend","Sie schläft gleich ein"], correct:0 }
];


const quiz = quizKatze;
let currentQuestion = 0;
let correctCount = 0;
let wrongAnswers = []; // Yanlış cevapları saklamak için

function showQuestion() {
  if(currentQuestion >= quiz.length){
    document.getElementById("question").style.display = "none";
    document.getElementById("answers").style.display = "none";
    document.getElementById("questionNumber").style.display = "none";
    
    document.getElementById("quiz-result").style.display = "block";
    document.querySelector(".correct-count").textContent = `Richtig: ${correctCount}`;
    document.querySelector(".wrong-count").textContent = `Falsch: ${quiz.length - correctCount}`;
    
    // Yanlış soruları göster
    showWrongAnswers();
    return;
  }

  document.getElementById("questionNumber").innerText = `${currentQuestion + 1} / ${quiz.length}`;
  document.getElementById("question").innerText = quiz[currentQuestion].question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  quiz[currentQuestion].answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(index){
  if(index === quiz[currentQuestion].correct){
    correctCount++;
  } else {
    // Yanlış cevabı kaydet
    wrongAnswers.push({
      questionNumber: currentQuestion + 1,
      question: quiz[currentQuestion].question,
      userAnswer: quiz[currentQuestion].answers[index],
      correctAnswer: quiz[currentQuestion].answers[quiz[currentQuestion].correct]
    });
  }
  currentQuestion++;
  showQuestion();
}

function showWrongAnswers() {
  const wrongAnswersDiv = document.getElementById("wrong-answers-list");
  if(!wrongAnswersDiv) return;
  
  if(wrongAnswers.length === 0) {
    wrongAnswersDiv.innerHTML = "<p style='color: green; font-weight: bold;'>Perfekt! Alle Antworten waren richtig! 🎉</p>";
  } else {
    let html = "<h3>Falsche Antworten:</h3>";
    wrongAnswers.forEach(item => {
      html += `
        <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff3f3;">
          <strong>Frage ${item.questionNumber}:</strong> ${item.question}<br>
          <span style="color: red;">❌ Deine Antwort: ${item.userAnswer}</span><br>
          <span style="color: green;">✓ Richtige Antwort: ${item.correctAnswer}</span>
        </div>
      `;
    });
    wrongAnswersDiv.innerHTML = html;
  }
}

showQuestion();