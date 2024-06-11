const url = 'https://flixster.p.rapidapi.com/movies/detail?emsVersionId=0e2459f2-51d8-30f3-9114-4b0e7d3946dc';
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

        const movie = objective.data.movie; // Assuming data.movie is an object

        if (movie) {
            const name = movie.name;
            const duration = movie.durationMinutes;
            const synopsis = movie.synopsis || '';
            const director = movie.directedBy || '';
            const releaseDate = movie.releaseDate || '';
            const poster = movie.posterImage ? movie.posterImage.url : '';
            const userRating = movie.userRating ? movie.userRating.dtlLikedScore : '';
            const tomatoRating = movie.tomatoRating ? movie.tomatoRating.tomatometer : '';
            const tomatoConsensus = movie.tomatoRating ? movie.tomatoRating.consensus : '';

            // Create the movie HTML
            const movieHTML = `
                <div class="logo">
                    <img src="${poster}" alt="${name} poster">
                </div>
                <div class="details">
                    <h1>${name}</h1>
                    <p><strong>Directed by:</strong> ${director}</p>
                    <p><strong>Duration:</strong> ${duration} minutes</p>
                    <p><strong>Release Date:</strong> ${releaseDate}</p><br>
                    <p><strong>Synopsis:</strong> ${synopsis}</p> <br>
                    <p><strong>User Rating:</strong> ${userRating}%</p>
                    <p><strong>Tomatometer:</strong> ${tomatoRating}%</p>
                </div>
            `;

            document.querySelector('.all').innerHTML += movieHTML;
        } else {
            console.error('Movie data is not available.');
        }
    })
    .catch(err => {
        console.error(err);
    });
