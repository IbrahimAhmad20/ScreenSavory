import { MovieWatched } from "./MovieWatched";

export function SummaryList({ watched, handleDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <MovieWatched
          movie={movie}
          key={movie.imdbID}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
