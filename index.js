
    // Fetch jokes from JSON file
    fetch('http://localhost:3000/Jokes')
    .then(response => response.json())
    .then(data => {
        const jokes = data; 
        // Assuming the response directly contains an array of jokes
        const container = document.getElementById('container'); // Assuming you have a container element in your HTML
        jokes.forEach((joke, index) => {
            const jokeElement = document.createElement('div');
            jokeElement.classList.add('box');
            jokeElement.textContent = joke.name;
            const jokeContent = document.createElement('div');
            jokeContent.classList.add('joke-content');
            jokeContent.textContent = joke.joke;
            jokeElement.appendChild(jokeContent);
            jokeElement.addEventListener('click', () => {
                toggleJokeContent(jokeContent);
            });
            container.appendChild(jokeElement);
        });
    })
    .catch(error => {
        console.error('Error fetching jokes:', error);
    });

function toggleJokeContent(jokeContent) {
    jokeContent.style.display = jokeContent.style.display === 'block' ? 'none' : 'block';
}




function submitJoke() {
    var jokeInput = document.getElementById('ugotjokes');
    var joke = jokeInput.value;
    if (joke.trim() !== '') {
      addJokeToList(joke);
      saveJoke(joke);
      jokeInput.value = '';
    }
  }

  function addJokeToList(joke) {
    var jokeList = document.getElementById('jokeList');
    var jokeElement = document.createElement('div');
    jokeElement.classList.add('joke');
    jokeElement.textContent = joke;

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
      deleteJoke(joke);
      jokeList.removeChild(jokeElement);
    };

    jokeElement.appendChild(deleteButton);
    jokeList.appendChild(jokeElement);
  }

  function deleteJoke(joke) {
    var jokes = JSON.parse(localStorage.getItem('jokes')) || [];
    var index = jokes.indexOf(joke);
    if (index !== -1) {
      jokes.splice(index, 1);
      localStorage.setItem('jokes', JSON.stringify(jokes));
    }
  }

  function saveJoke(joke) {
    var jokes = JSON.parse(localStorage.getItem('jokes')) || [];
    jokes.push(joke);
    localStorage.setItem('jokes', JSON.stringify(jokes));
  }

  function loadJokes() {
    var jokes = JSON.parse(localStorage.getItem('jokes')) || [];
    jokes.forEach(function(joke) {
      addJokeToList(joke);
    });
  }

  // Load jokes when the page loads
  window.onload = loadJokes;