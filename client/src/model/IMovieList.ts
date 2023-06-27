export interface TopLevel {
  movies: Movies;
}

export interface Movies {
  [key: string]: MoviesComingElement[];
}

export interface MoviesComingElement {
  id: string;
  title: string;
  year: string;
  genres: string[];
  ratings: number[];
  poster: string;
  contentRating: string;
  duration: string;
  releaseDate: string;
  averageRating: number;
  originalTitle: string;
  storyline: string;
  actors: string[];
  imdbRating: number;
  posterurl: string;
}
