import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movies);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <div typeof="text" id={movies.id}></div>
    </div>
  );
}
export default Detail;
