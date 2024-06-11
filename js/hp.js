document.addEventListener('DOMContentLoaded', async () => {
    const searchBar = document.getElementById('search-bar');
    const cinemaSelect = document.getElementById('cinema-select');
    const movieModal = document.getElementById('movie-modal');
    const movieDetails = document.getElementById('movie-details');
    const closeModal = document.querySelector('.close');
    const moviesContainer = document.getElementById('movies');
    const givelist = document.getElementById('givelist')

    // const apiKey = '48b8acbfdfmsh7cbfdcf79d6939ep15bb8fjsn836891571759'; // Replace with your actual API key

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-key': apiKey,
    //         'x-rapidapi-host': 'flixster.p.rapidapi.com'
    //     }
    // };

    const cinemasApiUrl = 'https://flixster.p.rapidapi.com/theaters/list?zipCode=90002&radius=50';
    const moviesApiUrl = 'https://flixster.p.rapidapi.com/movies/get-opening?countryId=usa';

    // Fetch cinema data
    try {
        const response = await fetch(cinemasApiUrl, options);
        const result = await response.json();
        console.log('Cinemas API response:', result); // Log the API response
        if (result && result.data && result.data.theaters) {
            result.data.theaters.forEach(cinema => {
                const option = document.createElement('option');
                option.value = cinema.id;
                option.textContent = cinema.name;
                cinemaSelect.appendChild(option);
            });
        } else {
            console.error('No theaters data found in the response');
        }
    } catch (error) {
        console.error('Error fetching cinemas:', error);
    }

    // Fetch movie openings data
    // async function fetchMovies(cinemaId) {
    //     const url = cinemaId ? `${moviesApiUrl}&cinemaId=${cinemaId}` : moviesApiUrl;
    //     try {
    //         const response = await fetch(url, options);
    //         const data = await response.json();
    //         console.log('Movies API response:', data); // Log the API response
    //         if (data && data.data && data.data.opening) {
    //             renderMovies(data.data.opening);
    //         } else {
    //             console.error('No movies data found in the response');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching movies:', error);
    //         const errorMessage = document.createElement('p');
    //         errorMessage.textContent = 'Sorry, we are unable to load showtimes at the moment.';
    //         moviesContainer.appendChild(errorMessage);
    //     }
    // }

    // function renderMovies(movies) {
    //     moviesContainer.innerHTML = '';
    //     movies.forEach(movie => {
    //         const movieElement = document.createElement('div');
    //         movieElement.classList.add('movie');
    //         movieElement.dataset.id = movie.emsId;

    //         const movieTitle = document.createElement('h2');
    //         movieTitle.textContent = movie.name;
    //         movieElement.appendChild(movieTitle);

    //         const moviePoster = document.createElement('img');
    //         moviePoster.src = movie.posterImage.thumbnail;
    //         moviePoster.alt = `${movie.name} Poster`;
    //         movieElement.appendChild(moviePoster);

    //         const showtimesList = document.createElement('ul');
    //         showtimesList.classList.add('showtimes');

    //         movie.showtimes.forEach(showtime => {
    //             const showtimeItem = document.createElement('li');
    //             showtimeItem.textContent = showtime.dateTime;
    //             showtimesList.appendChild(showtimeItem);
    //         });

    //         movieElement.appendChild(showtimesList);
    //         moviesContainer.appendChild(movieElement);
    //     });
    // }

    // moviesContainer.addEventListener('click', async event => {
    //     const movieElement = event.target.closest('.movie');
    //     if (movieElement) {
    //         const movieId = movieElement.dataset.id;
    //         const url = `https://flixster.p.rapidapi.com/movies/detail?emsVersionId=${movieId}`;
    //         try {
    //             const response = await fetch(url, options);
    //             const movie = await response.json();
    //             console.log('Movie details response:', movie);
    //             showMovieDetails(movie.data.movie);
    //         } catch (error) {
    //             console.error('Error fetching movie details:', error);
    //         }
    //     }
    // });

    // function showMovieDetails(movie) {
    //     const movieDetailsContainer = document.getElementById('movie-details-container');
    //     movieDetailsContainer.innerHTML = `
    //         <h6 style="text-decoration: underline; color: white;">Details</h6>
    //         <h1 class="title">${movie.name}</h1>
    //         <h5>Ratings</h5>
    //         <h5><div class="button-togs">
    //             <button > Action </button>
    //             <button >Crime</button>
    //             <button> Thriller</button>
    //         </div></h5>
    //         <p>Description: ${movie.synopsis}</p>
    //         <p>Directed By: ${movie.directedBy}</p>
    //         <p>Release Date: ${movie.releaseDate}</p>
    //         <p>Availability: ${movie.availabilityWindow}</p>
    //     `;
    //     movieModal.style.display = 'block';
    // }
    

    // closeModal.addEventListener('click', () => {
    //     movieModal.style.display = 'none';
    // });

    // searchBar.addEventListener('input', async () => {
    //     const query = searchBar.value.toLowerCase();
    //     const url = `https://flixster.p.rapidapi.com/search?zipCode=90002&radius=50&query=${query}`;
    //     try {
    //         const response = await fetch(url, options);
    //         const data = await response.json();
    //         console.log('Search API response:', data); // Log the API response
    //         if (data && data.data && data.data.search) {
    //             renderMovies(data.data.search.movies);
    //         } else {
    //             console.error('No search data found in the response');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching search results:', error);
    //     }
    // });

     cinemaSelect.addEventListener('change', () => {
        const cinemaId = cinemaSelect.value;
        fetchMovies(cinemaId);
     });

    // window.addEventListener('click', event => {
    //     if (event.target == movieModal) {
    //         movieModal.style.display = 'none';
    //     }
    // });

    // Initial fetch of movies without cinema selection
    fetchMovies();

    const url = 'https://flixster.p.rapidapi.com/movies/get-upcoming?countryId=usa&limit=100';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7b82c2cf82msh95d7024d6d09825p1d118ejsn3c6f6765785f',
            'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
        }
    };
    
    
    fetch(url, options)
    .then(response => response.json())
    .then(objective => {
        console.log(objective); // Log the entire response data

        const list = objective.data.upcoming;

         list.map((item) => {
            const name = item.name;
            const poster = item.posterImage ? item.posterImage.url : ''; 
            const movie = `<div class="logo">
            <img src="${poster}" alt="${name} poster">
        </div>
            <h1>${name}</h1>>
        </div>`;
            document.querySelector('#givelist').innerHTML += movie;
         })
    })
    .catch(err => {
        console.error(err);
    });

});