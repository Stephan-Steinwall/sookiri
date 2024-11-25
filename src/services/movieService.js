// In-memory storage (this will reset when you refresh the page)
let movies = [];

// Generate unique IDs for movies
const generateId = () => `movie_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const movieService = {
  // Add a new movie
  addMovie: (movieData) => {
    const newMovie = {
      id: generateId(),
      ...movieData,
      createdAt: new Date().toISOString()
    };
    movies.push(newMovie);
    // Also save to localStorage to persist data
    localStorage.setItem('movies', JSON.stringify(movies));
    return newMovie;
  },

  // Get all movies
  getMovies: () => {
    // Try to load movies from localStorage
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      movies = JSON.parse(storedMovies);
    }
    return movies;
  }
};