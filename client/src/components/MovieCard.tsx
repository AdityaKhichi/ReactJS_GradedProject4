import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiStarSFill } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { ScrollPosition } from "react-lazy-load-image-component";
import { AppDispatch } from "../store/store";
import {
  addFavouriteMovie,
  removeFavouriteMovie,
  updateNavigation,
  favouriteMoviesSelector,
} from "../store/selectors";
import {
  deleteFavouriteMovie,
  postFavouriteMovie,
} from "../store/serviceSlice";
import { MoviesComingElement } from "../model/IMovieList";
import Lazy from "../utils/Lazy";
import "../styles/MovieCard.scss";

interface MovieProps {
  movie: MoviesComingElement;
  scrollPosition: ScrollPosition;
}

const MovieCard = ({ movie, scrollPosition }: MovieProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const noPosterImage = require("../assets/no-poster.png");
  const [posterError, setPosterError] = useState(false);

  const { activeTab } = useSelector(updateNavigation);
  const favouriteMovies = useSelector(favouriteMoviesSelector);
  const movieAlreadyFav = favouriteMovies.some(
    (fav) => fav.title === movie.title
  );

  const addToFav = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (movieAlreadyFav) {
      toast.warn(`Error! '${movie.title}' is already added to favourites`, {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
      return;
    }

    const response = await dispatch(postFavouriteMovie(movie));
    if (response.payload === 201) {
      toast.success(`${movie.title} added to favourites successfully`, {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
      dispatch(addFavouriteMovie(movie));
    } else {
      console.log(response.payload);
    }
  };

  const removeFromFav = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const response = await dispatch(deleteFavouriteMovie(movie.id));
    if (response.payload == 200) {
      toast.error(`${movie.title} removed from favourites`, {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
      dispatch(removeFavouriteMovie(movie.id));
    } else {
      console.log(response.payload);
    }
  };

  const imageClick = () => {
    navigate(`/movie/${movie.id}`, {
      state: { posterError: posterError, id: movie.id },
    });
  };

  const handleImageError = () => {
    setPosterError(true);
  };

  return (
    <Fragment>
      <Card className="cards" onClick={imageClick}>
        {posterError ? (
          <Lazy
            className="cards__img"
            src={noPosterImage}
            scrollPosition={scrollPosition}
          />
        ) : (
          <Lazy
            className="cards__img"
            src={movie.posterurl}
            scrollPosition={scrollPosition}
            handleImageError={handleImageError}
          />
        )}
        <Card.ImgOverlay
          className={`cards__overlay ${
            posterError ? "cards__overlay--visible" : ""
          }`}
        >
          {activeTab === "favourite" ? (
            <>
              <button className="card__fav" onClick={removeFromFav}>
                <FaHeart />
              </button>
            </>
          ) : (
            <>
              <button className="card__fav" onClick={addToFav}>
                {movieAlreadyFav ? <FaHeart /> : <FaRegHeart />}
              </button>
            </>
          )}
          <Card.Title className="card__title">{movie.title}</Card.Title>
          <Card.Text className="card__detail">
            {movie.releaseDate}
            <span className="card__rating">
              {movie.imdbRating}
              <RiStarSFill />
            </span>
          </Card.Text>
          <Card.Text className="card__description">
            {`${movie.storyline.slice(0, 113)}...`}
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </Fragment>
  );
};
export default MovieCard;
