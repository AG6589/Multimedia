const TMDB_API_KEY = '8a84a0737fc06490be7be57b7b018b4c';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovieTrailer = async (title) => {
    try {
        // 1. Search for movie/tv
        const searchRes = await fetch(`${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`);
        const searchData = await searchRes.json();

        if (!searchData.results || searchData.results.length === 0) return null;

        const result = searchData.results[0];
        const mediaType = result.media_type; // 'movie' or 'tv'
        const id = result.id;

        // 2. Get videos
        const videoRes = await fetch(`${BASE_URL}/${mediaType}/${id}/videos?api_key=${TMDB_API_KEY}`);
        const videoData = await videoRes.json();

        const trailer = videoData.results.find(v => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube');
        return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
    } catch (error) {
        console.error('Error fetching trailer:', error);
        return null;
    }
};
