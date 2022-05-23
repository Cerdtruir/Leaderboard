import './style.css';

let listOfScores = [];

async function post(name, score) {
  await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/3k90Dr27MKo8G1oyFr1s/scores/',
    {
      method: 'POST',
      body: JSON.stringify({
        user: name,
        score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
}

async function get() {
  const response = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/3k90Dr27MKo8G1oyFr1s/scores/',
  );
  const jsonResponse = await response.json();
  return jsonResponse.result;
}

const leaderboard = document.getElementById('leaderboard');

async function buildLeaderboard() {
  leaderboard.innerHTML = '';
  listOfScores = await get();
  listOfScores.sort((a, b) => (b.score) - (a.score));
  listOfScores.forEach((score) => {
    const scoreItem = document.createElement('li');
    scoreItem.innerHTML = `${score.user}: ${score.score}`;
    leaderboard.appendChild(scoreItem);
  });
}

const checkIfScoreIsValid = (name, score) => {
  if (name === '' || score === '0') {
    return false;
  }
  return true;
};

const postScore = async (name, nameValue, score, scoreValue) => {
  await post(nameValue, scoreValue);
  name.value = '';
  score.value = '';
  buildLeaderboard();
};

function addScore() {
  const submit = document.getElementById('submit');
  submit.addEventListener('click', async () => {
    const name = document.getElementById('name');
    const score = document.getElementById('score');
    const nameValue = name.value;
    const scoreValue = score.value;
    if (checkIfScoreIsValid(nameValue, scoreValue)) {
      postScore(name, nameValue, score, scoreValue);
    }
  });
}

function refresh() {
  const refresh = document.getElementById('refresh');
  refresh.addEventListener('click', () => {
    buildLeaderboard();
  });
}

refresh();

addScore();

buildLeaderboard();
