import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    duration: '',
    showTime1: '',
    showTime2: ''
  });
  
  const [movieBanner, setMovieBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setMovieBanner(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setMessage({ type: 'error', text: 'Please select a valid image file' });
      }
    }
  };

  const removeBanner = () => {
    setMovieBanner(null);
    setBannerPreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setMovieData({
      title: '',
      duration: '',
      showTime1: '',
      showTime2: ''
    });
    setMovieBanner(null);
    setBannerPreview(null);
  };

  const handleSubmit = async () => {
    // Validation
    if (!movieData.title.trim() || !movieData.duration.trim() || !bannerPreview) {
      setMessage({ 
        type: 'error', 
        text: 'Please fill in all required fields and add a movie banner' 
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Get existing movies
      const existingMovies = JSON.parse(localStorage.getItem('movies') || '[]');
      
      // Create new movie object
      const newMovie = {
        id: `movie_${Date.now()}`,
        ...movieData,
        banner: bannerPreview,
        createdAt: new Date().toISOString()
      };
      
      // Add new movie to array
      const updatedMovies = [...existingMovies, newMovie];
      
      // Save to localStorage
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      
      setMessage({ type: 'success', text: 'Movie added successfully!' });
      resetForm();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Error adding movie. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="bg-[#111111] p-8 rounded-lg max-w-3xl mx-auto">
        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          }`}>
            {message.text}
          </div>
        )}

        {/* Banner Upload */}
        <div className="mb-8">
          <div 
            className="relative bg-gray-800 h-48 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden hover:bg-gray-700 transition-colors"
            onClick={() => !bannerPreview && document.getElementById('banner-upload').click()}
          >
            {bannerPreview ? (
              <>
                <img 
                  src={bannerPreview} 
                  alt="Movie Banner Preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeBanner();
                  }}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </>
            ) : (
              <div className="text-center text-gray-400">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">UPLOAD MOVIE BANNER</p>
              </div>
            )}
          </div>
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerUpload}
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-white mb-2 font-medium">MOVIE TITLE *</label>
            <input
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors"
              placeholder="Enter movie title"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">DURATION *</label>
            <input
              type="text"
              name="duration"
              value={movieData.duration}
              onChange={handleInputChange}
              placeholder="e.g., 2h 30min"
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">SHOW TIMES</label>
            <div className="space-y-4">
              <input
                type="text"
                name="showTime1"
                value={movieData.showTime1}
                onChange={handleInputChange}
                placeholder="First show time (e.g., 10:00 AM)"
                className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors"
              />
              <input
                type="text"
                name="showTime2"
                value={movieData.showTime2}
                onChange={handleInputChange}
                placeholder="Second show time (e.g., 2:30 PM)"
                className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex-1 bg-yellow-400 px-8 py-3 rounded-lg text-black font-semibold 
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'} 
                transition-colors`}
            >
              {isSubmitting ? 'Adding Movie...' : 'ADD MOVIE'}
            </button>
            
            <button
              onClick={resetForm}
              type="button"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              CLEAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;