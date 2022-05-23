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

function addScore() {
  const submit = document.getElementById('submit');
  submit.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    if (name === '' || score === '0') {
      return;
    }
    await post(name, score);
    document.getElementById('name').value = '';
    document.getElementById('score').value = '';
    buildLeaderboard();
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
