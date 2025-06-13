function searchMusic() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!query) {
    resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '998e9348a0msh798fda23aac7a5bp11ced4jsn83208d7a4657',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.data.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
      }

      data.data.slice(0, 10).forEach(track => {
        const trackDiv = document.createElement('div');
        trackDiv.className = 'track';
        trackDiv.innerHTML = `
          <strong>${track.title}</strong> by ${track.artist.name}<br>
          <audio controls src="${track.preview}"></audio>
        `;
        resultsDiv.appendChild(trackDiv);
      });
    })
    .catch(error => {
      console.error(error);
      resultsDiv.innerHTML = '<p>Error fetching results.</p>';
    });
}
