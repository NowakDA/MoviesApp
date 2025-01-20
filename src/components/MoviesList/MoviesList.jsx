
import { useState, useEffect } from 'react';
import {  Row, Col, Pagination, Spin, Alert } from 'antd';
import { format } from 'date-fns';
import MovieCard from '../MovieCard/MovieCard';
import "./MoviesList.css"
import noPoster from '../../assets/no-poster-available.jpg'



const MoviesList = ({movies, error}) => {
  //console.log(movies)

  const truncateDescription = (description, maxLength = 80) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, description.lastIndexOf(' ', maxLength)) + '...';
  };



  return (
    <>
       
      <Row gutter={[36,36]}>
        
        {movies.map(movie => (
          <Col span={12} key={movie.id}>
            <MovieCard 
              title={movie.title} 
              release = {movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : ''}
              description={truncateDescription(movie.overview)} 
              imageUrl={ movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noPoster}  
              rating={movie.vote_average}
            />
          </Col>
        ))}
      </Row>
     
    </>
  );
}

export default MoviesList;
