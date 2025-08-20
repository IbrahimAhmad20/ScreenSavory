import { useState, useEffect } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";

const KEY = "7cb97c71";

export function MovieDetails({ Id, hanleBack, handleAddtoList }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState(0);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function getMoviesDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${Id}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }

      getMoviesDetails();
    },
    [Id]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "Screen Savory";
      };
    },
    [title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={hanleBack}>
              &larr;
            </button>
            <img src={poster} alt="Poster of movie" />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section className="grid grid-1-col">
            <div className="rating">
              <StarRating maxRating={10} size={24} setRatings={setRatings} />
              {ratings > 0 && (
                <button
                  className="btn-add"
                  onClick={() => {
                    handleAddtoList({
                      ...movie,
                      userRating: ratings,
                      runtime:
                        movie.Runtime && movie.Runtime !== "N/A"
                          ? Number(movie.Runtime.split(" ")[0])
                          : null,
                    });
                  }}
                >
                  &#43; &nbsp; Add to List
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by : {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
