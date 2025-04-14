import { useState, useEffect } from "react";
// import useFetchSolution from "../../hook/useFetchSolution";
import { Link } from "react-router";
import {
  AccordionBody, 
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from "@material-tailwind/react";


import { genresUrl } from "../config";

export default function GenresDropDown() {
  const [genres, setGenres] = useState(null);
  // const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);
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
                {/* <li key={genre.id}>
                  <img src={genre.background_image} alt={genre.name} />
                  </li> */}
      <AccordionBody className="py-1">
        {error && <small>{error}</small> }
        <ul className="p-0">
          <List>
            {genres && genres.results.map((genre) => (
            <Link to={`/games/${genre.slug}`}>
              <ListItem key= {genre.id}>
                {/* <ListItemPrefix>
                <Avatar variant="circular" src={genre.background_image} alt={genre.name}/>
                </ListItemPrefix> */}
              
                <Typography variant="h6" color="blue-gray">
                  {genre.name}
                
                </Typography>
              
              </ListItem>
            </Link>
            ))}
            </List>
        </ul>
       
      </AccordionBody>
      
    </>
  );
}

