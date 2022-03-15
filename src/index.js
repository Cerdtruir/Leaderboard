import './style.css';

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
  listOfScores.forEach((score) => {
    const scoreItem = document.createElement('li');
    scoreItem.innerHTML = `${score.user}: ${score.score}`;
    leaderboard.appendChild(scoreItem);
  });
}

buildLeaderboard();
