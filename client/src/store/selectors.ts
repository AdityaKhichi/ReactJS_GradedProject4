import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";
import { navBarSlice } from "./navigationBarSlice";
import { moviesSlice } from "./moviesSlice";

// Action creators are generated for each case reducer function
export const { updateActiveTab, updateSearchvalue } = navBarSlice.actions;
export const { addFavouriteMovie, removeFavouriteMovie } = moviesSlice.actions;

export const updateNavigation = createSelector(
  (state: RootState) => state.nav,
  (nav) => ({
    activeTab: nav.activeTab,
    searchValue: nav.searchValue,
  })
);

export const filteredMoviesSelector = createSelector(
  (state: RootState) => state.movies,
  (state: RootState) => state.nav,
  (movies, nav) => {
    const activeMovies = movies.movies[nav.activeTab] || [];
    return activeMovies.filter((movie) =>
      movie.title.toLowerCase().includes(nav.searchValue.toLowerCase())
    );
  }
);

export const favouriteMoviesSelector = createSelector(
  (state: RootState) => state.movies,
  (movies) => {
    return movies.movies.favourite;
  }
);

export const movieSelector = createSelector(
  (state: RootState) => state.movies,
  (state: RootState) => state.nav,
  (movies, nav) => {
    return (id: string) => {
      const activeMovies = movies.movies[nav.activeTab];
      return activeMovies.find((movie) => movie.id === id);
    };
  }
);
