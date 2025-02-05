import { createContext, useState, useEffect, useMemo } from 'react';

import { optionsGet } from '../utils/ApiService';

const MovieContext = createContext();

function MovieProvider({ children }) {
  const [genresName, setGenres] = useState([]);
  const [sessionId, setSessionId] = useState(() => {
    const storedId = sessionStorage.getItem('guestSessionId');
    return storedId || null;
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list', optionsGet);
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    const createSession = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/authentication/guest_session/new',
          optionsGet,
        );
        const data = await response.json();
        setSessionId(data.guest_session_id);
        sessionStorage.setItem('guestSessionId', data.guest_session_id);
      } catch (error) {
        console.error('Error creating a guest session:', error);
      }
    };
    if (!sessionId) {
      createSession();
    }
    fetchGenres();
  }, [sessionId]);

  const value = useMemo(() => ({ genresName, sessionId }), [genresName, sessionId]);

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

export { MovieContext, MovieProvider };
