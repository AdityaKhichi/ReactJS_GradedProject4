import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MoviesComingElement, TopLevel } from "../model/IMovieList";
import { fetchMoviesData } from "./serviceSlice";

const initialState: TopLevel = {
  movies: {
    "movies-coming": [],
    "movies-in-theaters": [],
    "top-rated-india": [],
    "top-rated-movies": [],
    "favourite": [],
  },
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addFavouriteMovie: (state, action: PayloadAction<MoviesComingElement>) => {
      state.movies.favourite.push(action.payload);
    },
    removeFavouriteMovie: (state, action: PayloadAction<string>) => {
      state.movies.favourite = state.movies.favourite.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesData.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export default moviesSlice.reducer;
