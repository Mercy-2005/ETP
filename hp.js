   import axios from "axios";


// Your code with added closing brace and minor adjustments

document.addEventListener('DOMContentLoaded', () => {
    const moviesContainer = document.getElementById('movies');
    // Other variable declarations...
    const moviesApiUrl = 'https://flixster.p.rapidapi.com/movies/get-opening';
    const cinemasApiUrl = 'https://flixster.p.rapidapi.com/theaters/list';
    const rapidApiKey ='7b82c2cf82msh95d7024d6d09825p1d118ejsn3c6f6765785f'



    axios.get(cinemasApiUrl)
        .then(response => {
            const data = response.data;
    
            data.cinemas.forEach(async cinema => {
                const url = 'https://flixster.p.rapidapi.com/search?query=spiderman&zipCode=90002&radius=50';
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '7b82c2cf82msh95d7024d6d09825p1d118ejsn3c6f6765785f',
                        'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
                    }
                };
    
                try {
                    const response = await axios.request({ url, ...options });
                    const result = response.data;
                    console.log(result);
                } catch (error) {
                    console.error(error);
                }
            });
        })
        .catch(error => console.error('Error fetching cinemas:', error));
    
    // Other axios requests and functions...
    
    moviesContainer.addEventListener('click', event => {
        const movieElement = event.target.closest('.movie');
        if (movieElement) {
            const movieId = movieElement.dataset.id;
            axios.get(`${moviesApiUrl}/${movieId}`)
                .then(response => {
                    const movie = response.data;
                    showMovieDetails(movie);
                })
                .catch(error => console.error('Error fetching movie details:', error));
        }
    });
    
    function showMovieDetails(movie) {
        // Function implementation...
    }
    
    // Other fetch requests and functions...

    moviesContainer.addEventListener('click', event => {
        const movieElement = event.target.closest('.movie');
        if (movieElement) {
            const movieId = movieElement.dataset.id;
            fetch(`${moviesApiUrl}/${movieId}`)
                .then(response => response.json())
                .then(movie => {
                    showMovieDetails(movie);
                })
                .catch(error => console.error('Error fetching movie details:', error));
        }
    });
});

function showMovieDetails(movie) {
    // Function implementation...
}
