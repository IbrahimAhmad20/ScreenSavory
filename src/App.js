import { useEffect, useState } from "react";
import Loader from "./Components/Loader";
import { SearchBar } from "./Components/SearchBar";
import { NumResults } from "./Components/NumResults";
import { Box } from "./Components/Box";
import { MoviesList } from "./Components/MoviesList";
import { Summary } from "./Components/Summary";
import { MovieDetails } from "./Components/MovieDetails";
import { NavBar } from "./Components/NavBar";
import { SummaryList } from "./Components/SummaryList";
import { ErrorMessage } from "./Components/ErrorMessage";
import { useMovies } from "./useMovies";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState(function () {
  //   const storedItems = localStorage.getItem("watched");
  //   return JSON.parse(storedItems);
  // });
  const [watched, setWatched] = useState(function () {
    try {
      const storedItems = localStorage.getItem("watched");
      const parsed = storedItems ? JSON.parse(storedItems) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  function handleSelectedMovie(id) {
    id === selectedId ? setSelectedId(null) : setSelectedId(id);
  }

  function hanleBack() {
    setSelectedId(null);
  }

  function handleAddtoList(movie) {
    if (!watched.some((w) => w.imdbID === movie.imdbID)) {
      const newList = [...watched, movie];
      setWatched(newList);
    }
    setSelectedId(null);
  }

  function handleDelete(movie) {
    setWatched(watched.filter((w) => w.imdbID !== movie.imdbID));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  const { movies, isLoading, error } = useMovies(query);

  return (
    <>
      <NavBar>
        <SearchBar
          query={query}
          setQuery={setQuery}
          setSelectedId={setSelectedId}
        />
        <NumResults movies={movies} />
      </NavBar>
      <Main movies={movies}>
        <Box>
          {!isLoading && query === "" && (
            <p
              className="loader"
              style={{ margin: "0 auto", marginTop: "10rem" }}
            >
              Search a movie to get started
            </p>
          )}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box className="box-left">
          {selectedId ? (
            <MovieDetails
              Id={selectedId}
              hanleBack={hanleBack}
              handleAddtoList={handleAddtoList}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <SummaryList watched={watched} handleDelete={handleDelete} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

export function Movies({ movie, handleSelectedMovie }) {
  return (
    <li
      className="list list-movies"
      onClick={() => handleSelectedMovie(movie.imdbID)}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
