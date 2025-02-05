import { useState, useEffect, useContext } from 'react';
import { Alert, Spin, Tabs } from 'antd';

import SearchForm from './components/SearchForm/SearchForm';
import MoviesList from './components/MoviesList/MoviesList';
import NetworkStatus from './components/NetworkStatus/NetworkStatus';
import PaginationComponent from './components/Pagination/Pagination';
import { optionsGet } from './utils/ApiService';
import { MovieContext } from './context/MovieContext';
import './App.css';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [movies, setMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState(() => {
    const storedMovies = sessionStorage.getItem('ratedMovies');
    return storedMovies ? JSON.parse(storedMovies) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRatePage, setCurrentRatePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [totalRateResults, setTotalRateResults] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [tab, setTab] = useState(1);
  const { sessionId } = useContext(MovieContext);

  const createUrl = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const getUserRating = (movieId) => {
    if (!ratedMovies) return 0;
    const movieRating = ratedMovies.find((element) => element.id === movieId);
    return movieRating ? movieRating.rating : 0;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoadingCards(true);
      let url;

      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${currentPage}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`;
      }

      try {
        const response = await fetch(url, optionsGet);

        const data = await response.json();
        setMovies(data.results);
        setTotalResults(data.total_results);
        setError(null);
        setIsLoadingCards(false);
      } catch (errorMovies) {
        console.error('Error fetching movies:', error);
        setError(errorMovies.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      setIsLoadingCards(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=${currentRatePage}&sort_by=created_at.asc`,
          optionsGet,
        );

        const data = await response.json();
        if (response.ok) {
          setRatedMovies(data.results);
          setTotalRateResults(data.total_results);
          setError(null);
          sessionStorage.setItem('ratedMovies', JSON.stringify(data.results));
        } else {
          setRatedMovies(null);
        }
      } catch (errorRate) {
        console.error('Error fetching rated movies:', error);
        setError(errorRate.message);
      } finally {
        setIsLoadingCards(false);
      }
    };

    if (tab === '2') {
      fetchRatedMovies();
    }
  }, [tab, currentRatePage]);

  const tabItems = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <SearchForm createUrl={createUrl} />
          {!movies.length && (
            <Alert
              message="Something went wrong"
              description="Unfortunately, we couldn't find any movies for your search. Please try to change the search parameters."
              type="warning"
              showIcon
            />
          )}
          <MoviesList
            movies={movies}
            getUserRating={getUserRating}
            isLoadingCards={isLoadingCards}
          />
          {totalResults > 0 && (
            <PaginationComponent
              currentPage={currentPage}
              totalResults={totalResults}
              onChange={(page) => {
                setCurrentPage(page);
              }}
            />
          )}
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <>
          {!ratedMovies && (
            <Alert
              description="Unfortunately, we did not find any rated films."
              type="info"
              showIcon
            />
          )}
          {ratedMovies && (
            <MoviesList
              movies={ratedMovies}
              getUserRating={getUserRating}
              isLoadingCards={isLoadingCards}
            />
          )}
          {totalRateResults > 0 && (
            <PaginationComponent
              currentPage={currentRatePage}
              totalResults={totalRateResults}
              onChange={(page) => {
                setCurrentRatePage(page);
              }}
            />
          )}
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="spinner-container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: '20px' }}
      />
    );
  }

  return (
    <>
      <NetworkStatus
        onStatusChange={(status) => {
          setIsOnline(status);
        }}
      />
      {isOnline && (
        <>
          <Tabs
            destroyInactiveTabPane
            defaultActiveKey="1"
            items={tabItems}
            onChange={(tabKey) => setTab(tabKey)}
          />
          ;
        </>
      )}
    </>
  );
}

export default App;
