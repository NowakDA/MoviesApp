import { useContext } from 'react';
import { Card, Typography, Flex, Rate, Skeleton } from 'antd';

import './MovieCard.css';
import { MovieContext } from '../../context/MovieContext';
import { headers } from '../../utils/ApiService';

const { Text } = Typography;

function MovieCard({
  title,
  release,
  rating,
  description,
  imageUrl,
  genres,
  movieId,
  getUserRating,
  isLoadingCards,
}) {
  const { genresName, sessionId } = useContext(MovieContext);

  const getGenresName = (genresIds, genresNames) =>
    genresNames.filter((genre) => genresIds.includes(genre.id)).map((genre) => genre.name);
  const genreNames = getGenresName(genres, genresName);

  const handleRating = async (id, value) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${sessionId}`;

    try {
      await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          value,
        }),
      });
    } catch (error) {
      console.error('Error rating:', error);
    }
  };

  const getRatingClass = (value) => {
    if (value <= 3) return 'low-rating';
    if (value <= 5) return 'medium-rating';
    if (value <= 7) return 'high-rating';
    return 'top-rating';
  };

  if (isLoadingCards) {
    return <Skeleton />;
  }

  return (
    <Card className="movie-card" hoverable>
      <Flex justify="space-between">
        <img className="movie-card__img" alt="movie poster" src={imageUrl} />
        <Flex
          vertical
          align="flex-start"
          justify="space-between"
          style={{ padding: 9, paddingLeft: 20 }}
        >
          <Typography.Title level={4} className="movie-card__title">
            <span className="title">{title}</span>
            <span className={`rating ${getRatingClass(rating)}`}>{rating.toFixed(1)}</span>
          </Typography.Title>
          <Typography.Paragraph>{release}</Typography.Paragraph>
          <Typography.Paragraph className="genresList">
            {genreNames.slice(0, 2).map((genre, index) => (
              <Text key={index} keyboard className="genresName">
                {genre}
              </Text>
            ))}
          </Typography.Paragraph>
          <Typography.Paragraph className="movie-card__description">
            {description || 'There is no description'}
          </Typography.Paragraph>
          <Rate
            className="custom-rate"
            allowHalf
            defaultValue={getUserRating(movieId)}
            count={10}
            onChange={(value) => {
              handleRating(movieId, value);
            }}
          />
        </Flex>
      </Flex>
    </Card>
  );
}

export default MovieCard;
