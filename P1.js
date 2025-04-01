// Simple Movie Collection Program

// Array to store movies
let movies = [];

// Function to add a movie
function addMovie(title, genre, rating, year) {
    let movie = { title: title, genre: genre, rating: rating, year: year };
    movies.push(movie);
    console.log(`Added: ${title}`);
}

// Function to show movies by genre
function showMoviesByGenre(genre) {
    return movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
}

// Function to find the best-rated movie
function bestMovie() {
    return movies.reduce((top, movie) => (movie.rating > top.rating ? movie : top), movies[0]);
}

// Function to get all movie titles
function allTitles() {
    return movies.map(movie => movie.title);
}

// Function to find movies released after a certain year
function moviesAfterYear(year) {
    return movies.filter(movie => movie.year > year);
}

// Adding example movies
addMovie("Inception", "Sci-Fi", 8.8, 2010);
addMovie("The Dark Knight", "Action", 9.0, 2008);
addMovie("Interstellar", "Sci-Fi", 8.6, 2014);
addMovie("Parasite", "Thriller", 8.6, 2019);

console.log("Sci-Fi Movies:", showMoviesByGenre("Sci-Fi"));
console.log("Best Movie:", bestMovie());
console.log("All Titles:", allTitles());
console.log("Movies After 2010:", moviesAfterYear(2010));
