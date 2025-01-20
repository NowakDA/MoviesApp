import { useState, useEffect } from 'react';
import { Alert,Spin, Pagination } from 'antd';
import SearchForm from './components/SearchForm/SearchForm';
import MoviesList from './components/MoviesList/MoviesList';
import NetworkStatus from './components/utils/NetworkStatus';

import './App.css';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzNiZWJhNjhlMTY2ODEzZGUxYjI0MDQ0MzE0MmFkZSIsIm5iZiI6MTczNjI3NjcxMy40NjQsInN1YiI6IjY3N2Q3YWU5NmQ3Y2EwMGU3ODczMTMxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTKIbcyjQ4oIWHtCHeAHuovJixKLZcC8-VRTE68qA38'
const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [movies, setMovies] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  
  const createUrl = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); 
  };

  const fetchMovies = async () => {
    let url;

    if (searchQuery) {
      url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=true&language=en-US&page=${currentPage}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`;
    }

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`, 
          'Accept': 'application/json'
        }
      });

          const data = await response.json();
      setMovies(data.results);
      setTotalResults(data.total_results); 
      setError(null);
    } catch (error) {
      console.error('Error fetching movies:', error); 
      setError(error.message)
    }
    finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchQuery]);



  
  if (loading) {
    return (<Spin  size="large" />
    );
  }

  if(error) {
    return (<Alert
      message="Error"
      description={error}
      type="error"
      showIcon
      style={{ marginBottom: '20px' }}
    />)
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
          <SearchForm createUrl={createUrl} />
          <MoviesList 
           movies={movies}
           />
          <Pagination
            current={currentPage}
            pageSize={20}
            total={totalResults}
            onChange={(page) => {
              setCurrentPage(page);
            }}
            
          />
        </>
      )}
    </>
  );
};

export default App;
