import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MoviesComingElement } from "../model/IMovieList";

const api = "http://localhost:4002";

export const fetchMoviesData = createAsyncThunk(
  "movies/fetchAllMovies",
  async () => {
    try {
      const response = await axios.get(`${api}/db`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const postFavouriteMovie = createAsyncThunk(
  "movies/postFavourite",
  async (movie: MoviesComingElement) => {
    try {
      const response = await axios.post(`${api}/favourite`, movie, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteFavouriteMovie = createAsyncThunk(
  "movies/deleteFavourite",
  async (movieId: string) => {
    try {
      const response = await axios.delete(`${api}/favourite/${movieId}`);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  }
);
