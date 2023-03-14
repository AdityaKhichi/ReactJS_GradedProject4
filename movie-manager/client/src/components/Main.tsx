import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import IMovieList from "../model/IMovieList"
import { fetchMoviesList } from "../services/FetchData"
import MovieCard from "./MovieCard"

export default function Main({ searchValue }: { searchValue: string }) {
  const [moviesData, setMoviesData] = useState<IMovieList[]>([])
  const location = useLocation()

  let tabName: string | undefined = location.state?.tab
  if (tabName == undefined) {
    tabName = "movies-in-theaters"
  }

  /*useDebounce function is being used here to 
    avoid unnecessary Api calls for each keystroke on searchbar */
  const useDebounce = (value: string, delay: number): string => {
    const [debounceText, SetDebounceText] = useState(value)

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        SetDebounceText(value)
      }, delay)

      return () => clearTimeout(timeoutId)
    }, [value])

    return debounceText
  }
  const debouncedText = useDebounce(searchValue, 300)

  useEffect(() => {
    fetchMovies()
  }, [tabName, debouncedText])

  const fetchMovies = async () => {
    try {
      const movies = await fetchMoviesList(tabName, debouncedText)
      setMoviesData(movies)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <>
      {moviesData.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            tabName={tabName}
            fetchMovies={fetchMovies}
          />
        )
      })}
    </>
  )
}
