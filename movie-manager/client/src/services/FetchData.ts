import axios from "axios"
import IMovieList from "../model/IMovieList"

const HostApi: string = "http://localhost:4002"

export const fetchMoviesList = async (
  movieListType: string | undefined,
  search: string
) => {
  if (search === undefined || search === "") {
    const Api = `${HostApi}/${movieListType}`
    return await axios.get(Api).then((res) => res.data)
  }
  const Api = `${HostApi}/${movieListType}?title_like=${search}`
  return await axios.get(Api).then((res) => res.data)
}

export const fetchMovie = async (tab?: string, movieId?: string) => {
  if (movieId) {
    const Api = `${HostApi}/${tab}?id=${movieId}`
    return axios.get(Api).then((response) => response.data)
  }
  const Api = `${HostApi}/${tab}`
  return axios.get(Api).then((response) => response.data)
}

export const fetchFavouriteMovies = async (movieName?: string) => {
  if (typeof movieName == "string") {
    const Api = `${HostApi}/favourite?title=${movieName}`
    return axios.get(Api).then((response) => response.data)
  }
  return axios.get(`${HostApi}/favourite`).then((response) => response.data)
}

export const addMovieToFavourites = async (movie: IMovieList) => {
  return axios
    .post(`${HostApi}/favourite`, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.status)
}

export const removeMovieFromFavourites = async (movieId: number) => {
  const Api = `${HostApi}/favourite/${movieId}`
  return axios.delete(Api).then((response) => response.status)
}
