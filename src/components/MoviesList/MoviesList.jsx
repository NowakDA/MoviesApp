
import {  Row, Col } from 'antd';
import { format } from 'date-fns';

import cutDescription from '../../utils/formatTexts';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.css';
import noPoster from '../../assets/no-poster-available.jpg';


function MoviesList({movies,  getUserRating, isLoadingCards }) {

 


  return (
    <Row gutter={[36,36]}>
        
      {movies.map(movie => (
        <Col span={12} key={movie.id}>
          <MovieCard 
            title={cutDescription(movie.title, 35)} 
            release = {movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : ''}
            description={cutDescription(movie.overview)} 
            imageUrl={ movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noPoster}  
            rating={movie.vote_average}
            genres ={movie.genre_ids}
            movieId={movie.id}

            getUserRating={getUserRating}
            isLoadingCards={isLoadingCards}
          />
        </Col>
      ))}
    </Row>
  );
}

export default MoviesList;
