
const quizLeichtathletik = [
    { question: "Wie lang ist ein Marathonlauf?", answers: ["35,150 km","42,195 km","40 km","45,195 km"], correct:1 },
    { question: "Welche Disziplin gehört nicht zur Leichtathletik?", answers: ["Hochsprung","Weitsprung","Kugelstossen","Rudern"], correct:3 },
    { question: "Wie viele Hürden gibt es beim 110-Meter-Hürdenlauf der Männer?", answers: ["8","9","10","12"], correct:2 },
    { question: "Wer hält den Weltrekord im 100-Meter-Lauf der Männer (Stand: 2025)?", answers: ["Carl Lewis","Usain Bolt","Tyson Gay","Justin Gatlin"], correct:1 },
    { question: "In welcher Disziplin wird der Speer verwendet?", answers: ["Diskuswurf","Speerwurf","Hammerwurf","Kugelstossen"], correct:1 },
    { question: "Was bedeutet der Begriff „Zehnkampf“?", answers: ["Ein Lauf mit zehn Runden","Wettkampf mit zehn Disziplinen","Ein Wettbewerb mit zehn Teilnehmern","Ein Staffellauf"], correct:1 },
    { question: "Wie viele Meter ist eine komplette Runde auf einer Leichtathletikbahn?", answers: ["400 Meter","500 Meter","300 Meter","800 Meter"], correct:0 },
    { question: "Wie viele Athleten laufen in einer 4x100-Meter-Staffel pro Team?", answers: ["2","3","4","5"], correct:2 },
    { question: "Was ist beim Kugelstossen entscheidend?", answers: ["Das Gewicht der Kugel","Die Laufgeschwindigkeit","Die Stosstechnik","Die Sprunghöhe"], correct:2 },
    { question: "Was ist der Weltrekord im Stabhochsprung bei den Männer (Stand: 2025)?", answers: ["5.40m","6.30m","6.40m","6.20m"], correct:2 }
];

const quiz = quizLeichtathletik;
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