import { average } from "../App";

function averageRuntime(movies) {
  const runtimes = movies
    .map((movie) => movie.runtime)
    .filter((n) => typeof n === "number" && !isNaN(n));

  if (runtimes.length === 0) return 0;

  const sum = runtimes.reduce((acc, cur) => acc + cur, 0);
  return sum / runtimes.length;
}

export function Summary({ watched = [] }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(2);
  const avgRuntime = averageRuntime(watched).toFixed(0);
  console.log(watched.map((m) => m.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>
            {avgRuntime > 0 ? `${avgRuntime} min` : "No runtime data"}
          </span>
        </p>
      </div>
    </div>
  );
}
