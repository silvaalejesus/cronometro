const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const millisecondsEl = document.querySelector("#milliseconds");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resumeBtn = document.querySelector("#resumeBtn");
const resetBtn = document.querySelector("#resetBtn");

let interval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isPaused = false;

// FUNÇÃO QUE RODA O TEMPORIZADOR
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);

function startTimer() {
  // determina a mundaça do tempo
  interval = setInterval(() => {
    // verifica se esta pausado pq se estiver pausado nao deve executar a mudança de valores
    if (!isPaused) {
      milliseconds += 10;
      // verifica se o milli é igual a mil, se for, incrementa 1 segundo
      if (milliseconds === 1000) {
        seconds++;
        milliseconds = 0;
      }
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }

      minutesEl.textContent = formatTime(minutes);
      secondsEl.textContent = formatTime(seconds);
      millisecondsEl.textContent = formatMilliseconds(milliseconds);
    }
  }, 10);

  // esconde o botão de iniciar e mostra o botão de pausar
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
}

function pauseTimer() {
  isPaused = true;
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "block";
}

function resumeTimer() {
  isPaused = false;
  pauseBtn.style.display = "block";
  resumeBtn.style.display = "none";
}

function resetTimer() {
  clearInterval(interval);
  isPaused = false;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
  millisecondsEl.textContent = "000";

  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "none";
}

// função auxiliar para formatar o tempo adicionando um zero na frente quando o tempo for menor que 10
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// função auxiliar para formatar o milliseconds
function formatMilliseconds(time) {
  /* O time vem com o tipo number e o padStart é o método usando em strings.
    passando o time em uma template string ele é convertido para string assim
    possibilitando o uso do padStart */
  return time < 100 ? `${time}`.padStart(3, "0") : time;
}
