export function MovieWatched({ movie, handleDelete }) {
  console.log("Movies Watched State", movie);
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime}</span>
        </p>
      </div>
      <button className="btn-delete" onClick={() => handleDelete(movie)}>
        <span>&times;</span>
      </button>
    </li>
  );
}
