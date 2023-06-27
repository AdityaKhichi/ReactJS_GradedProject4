import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { filteredMoviesSelector } from "../store/selectors";
import { fetchMoviesData } from "../store/serviceSlice";
import { Container } from "react-bootstrap";
import {
  trackWindowScroll,
  ScrollPosition,
} from "react-lazy-load-image-component";
import MovieCard from "./MovieCard";
import "../styles/Main.scss";

export function Main({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  const dispatch = useDispatch<AppDispatch>();
  const filteredMovies = useSelector(filteredMoviesSelector);

  useEffect(() => {
    dispatch(fetchMoviesData());
  }, []);

  return (
    <div className="main-wrapper">
      <Container>
        {filteredMovies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            scrollPosition={scrollPosition}
          />
        ))}
      </Container>
    </div>
  );
}
export default trackWindowScroll(Main);
