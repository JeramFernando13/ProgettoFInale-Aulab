import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  AccordionBody,
} from "@material-tailwind/react";


import { genresUrl } from "../config";

export default function GenresDropDown() {
  const [genres, setGenres] = useState(null);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const response = await fetch(genresUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setGenres(json);
    } catch (error) {
      setError(error.message);
      setGenres(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <AccordionBody className="py-1">
        {error && <small>{error}</small> }
        <ul className="p-0">
             {genres && genres.results.map((genre) => (
                <li key={genre.id}>
                <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                </li>
            ))}
        </ul>
       
            <h3>Singoli generi... </h3>
      </AccordionBody>
      
    </>
  );
}

