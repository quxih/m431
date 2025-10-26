const quizFussball = [
  { question: "Wer gewann die FIFA-Weltmeisterschaft 2014?", answers: ["Spanien", "Deutschland", "Brasilien", "Argentinien"], correct: 1 },
  { question: "Wie viele Spieler hat ein Fussballteam auf dem Spielfeld?", answers: ["9", "10", "11", "12"], correct: 2 },
  { question: "Welcher Spieler hat die meisten Tore in der Geschichte der Fussball-Weltmeisterschaften erzielt?", answers: ["Miroslav Klose", "Pelé", "Ronaldo (Brasilien)", "Lionel Messi"], correct: 0 },
  { question: "Wie heisst das grösste Fussballstadion Europas?", answers: ["Wembley Stadium", "Camp Nou", "Allianz Arena", "San Siro"], correct: 1 },
  { question: "Welcher Verein gewann am häufigsten die UEFA Champions League?", answers: ["Bayern München", "AC Mailand", "Real Madrid", "Manchester United"], correct: 2 },
  { question: "Wie lange dauert ein reguläres Fussballspiel ohne Verlängerung?", answers: ["80 Minuten", "90 Minuten", "100 Minuten", "120 Minuten"], correct: 1 },
  { question: "Welche Farbe hat die Karte, die ein Spieler bei schwerem Foulspiel bekommt?", answers: ["Blau", "Rot", "Grün", "Gelb"], correct: 1 },
  { question: "Wer ist der Rekordtorschütze der Bundesliga (Stand: 2025)?", answers: ["Gerd Müller", "Robert Lewandowski", "Klaus Fischer", "Jupp Heynckes"], correct: 0 },
  { question: "Welcher Kontinent hat am häufigsten die Fussball-Weltmeisterschaft gewonnen?", answers: ["Asien", "Europa", "Afrika", "Nordamerika"], correct: 1 },
  { question: "Wie viele Punkte gibt es für einen Sieg in der Gruppenphase?", answers: ["1", "3", "2", "5"], correct: 1 },
];

const quiz = quizFussball;
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