import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { movieSelector } from "../store/selectors";
import { MoviesComingElement } from "../model/IMovieList";
import "../styles/MovieDetails.scss";

function MovieDetails() {
  const location = useLocation();

  const [movieData, setMovieData] = useState<MoviesComingElement | undefined>();
  const getMovieById = useSelector(movieSelector);

  const id: string = location.state?.id;
  const posterError: boolean = location.state?.posterError;
  const noPosterImage = require("../assets/no-poster.png");

  useEffect(() => {
    const movie = getMovieById(id);
    setMovieData(movie);
  }, []);

  const formatTime = (duration: string) => {
    const timeInMin = parseInt(duration.substring(2, duration.length - 1));
    const hours = Math.floor(timeInMin / 60);
    const minutes = timeInMin % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="main-wrapper">
      <Container key={movieData?.id}>
        <div className="go-back">
          <a href="/">Go Home</a>
        </div>
        {movieData && (
          <Row className="movie-details">
            <Col xs={12} md={3}>
              <Card className="movie-poster">
                <Card.Img
                  variant="top"
                  src={posterError ? noPosterImage : movieData.posterurl}
                />
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <Card className="movie-info">
                <Card.Body>
                  <Card.Title>
                    {`${movieData.title} (${movieData.year})`}
                  </Card.Title>
                  <div className="genres">
                    {movieData.genres.map((genre) => (
                      <Badge bg="secondary" className="genre-badge">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <Card.Text>{movieData.storyline}</Card.Text>
                  <div className="details">
                    <div className="infoItem">
                      <strong className="text bold">Content Rating:</strong>
                      <span className="text">
                        &nbsp;{movieData.contentRating}
                      </span>
                    </div>

                    <div className="infoItem">
                      <strong className="text bold">Release Date:</strong>
                      <span className="text">
                        &nbsp;
                        {new Date(movieData.releaseDate).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <div className="infoItem">
                      <strong className="text bold">Runtime:</strong>
                      <span className="text">
                        &nbsp;{formatTime(movieData.duration)}
                      </span>
                    </div>
                  </div>

                  <div className="actors">
                    <strong>Actors :</strong>
                    <span>&nbsp;{movieData.actors?.join(", ")}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default MovieDetails;
