import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Trash2, Edit } from 'lucide-react';

const Available = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Load movies when component mounts
    loadMovies();
  }, []);

  const loadMovies = () => {
    try {
      const storedMovies = JSON.parse(localStorage.getItem('movies') || '[]');
      setMovies(storedMovies);
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  };

  const handleDelete = (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        const updatedMovies = movies.filter(movie => movie.id !== movieId);
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        setMovies(updatedMovies);
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Available Movies</h2>
        <span className="text-gray-400">Total Movies: {movies.length}</span>
      </div>

      {movies.length === 0 ? (
        <div className="bg-[#111111] p-6 rounded-lg text-center">
          <p className="text-gray-400">No movies available. Add some movies to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-[#111111] rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-400 transition-all">
              {/* Movie Banner */}
              <div className="relative h-48">
                <img 
                  src={movie.banner} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Movie Details */}
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2">{movie.title}</h3>
                
                <div className="space-y-2">
                  {/* Duration */}
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{movie.duration}</span>
                  </div>

                  {/* Show Times */}
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <div className="text-sm">
                      {movie.showTime1 && <div>{movie.showTime1}</div>}
                      {movie.showTime2 && <div>{movie.showTime2}</div>}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-end space-x-2">
                  <button 
                    onClick={() => handleDelete(movie.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Available;