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
