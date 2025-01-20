
import { Button, Card, Typography, Flex, Rate } from 'antd';
import getRatingClass from '../utils/getRatingClass';
import "./MovieCard.css";





const MovieCard = ({ title, release, rating, description, imageUrl }) => {
  

  return (
    <Card className="movie-card" hoverable >
      <Flex justify="space-between">
        <img className='movie-card__img' alt="movie poster" src={imageUrl}/>
        <Flex vertical={true} align="flex-start" justify="space-between" style={{ padding: 5 }}>
          <Typography.Title level={4} className='movie-card__title'>
            <span className='title'>{title}</span>
            <div className={`rating ${getRatingClass(rating)}`}>{(rating).toFixed(1)}</div>
          </Typography.Title>
          <Typography.Paragraph>
            {release}
          </Typography.Paragraph>
          <Typography.Paragraph>
            {description}
          </Typography.Paragraph>
          <Rate className="custom-rate" allowHalf defaultValue={0} count={10} />
        </Flex>
      </Flex>
    </Card>
  );
};

export default MovieCard;
