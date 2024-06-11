document.addEventListener('DOMContentLoaded', function() {

    let page = 1; // Track the current page
    const searchForm = document.getElementById('search-form');
    const loadMoreContainer = document.createElement('div');
    loadMoreContainer.style.textAlign = 'center'; // Center the button
    loadMoreContainer.style.marginTop = '20px'; // Add some top margin

    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'Load More';
    loadMoreButton.style.display = 'none';
    loadMoreContainer.appendChild(loadMoreButton);
    document.body.appendChild(loadMoreContainer);

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        page = 1; // Reset to first page on new search
        const searchQuery = document.getElementById('search-bar').value.trim(); // Get the search query
        fetchMovies(searchQuery, page);
    });

    loadMoreButton.addEventListener('click', function() {
        const searchQuery = document.getElementById('search-bar').value.trim();
        page++; // Increment page number
        fetchMovies(searchQuery, page);
    });

    function fetchMovies(query, page) {
        const url = `https://imdb8.p.rapidapi.com/v2/search?searchTerm=${query}&page=${page}&type=MOVIE&first=20&country=US&language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7b82c2cf82msh95d7024d6d09825p1d118ejsn3c6f6765785f',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Return response as JSON
            })
            .then(data => {
                if (!data.data || !data.data.mainSearch || !data.data.mainSearch.edges) {
                    throw new Error('Malformed JSON response');
                }
                const movies = data.data.mainSearch.edges;

                const moviesContainer = document.getElementById('movie-details-container');
                const searchResultHeading = document.getElementById('search-result-heading');
                if (!moviesContainer || !searchResultHeading) {
                    throw new Error('Required containers not found');
                }

                if (page === 1) {
                    // Clear previous movie listings and heading on new search
                    moviesContainer.innerHTML = '';
                    searchResultHeading.innerHTML = `Result for "${query}"`;
                }

                // Create HTML for each movie
                movies.forEach(movie => {
                    const movieNode = movie.node.entity;
                    const name = movieNode.titleText.text; // Movie name
                    const releaseYear = movieNode.releaseYear.year; // Release year
                    const imageUrl = movieNode.primaryImage ? movieNode.primaryImage.url : ''; // Image URL

                    const movieHTML = `
                        <div class="movie-card">
                            <div class="poster-box" style="background-image: url('${imageUrl}');"></div>
                            <h3 class="title">${name}</h3>
                            <p class="meta-list"> (${releaseYear})</p>
                        </div>
                    `;

                    // Append movie HTML to the movies section
                    moviesContainer.innerHTML += movieHTML;
                });

                // Show or hide the "Load More" button based on the data
                loadMoreButton.style.display = movies.length ? 'block' : 'none';
            })
            .catch(error => console.error('Error:', error));
    }
});
