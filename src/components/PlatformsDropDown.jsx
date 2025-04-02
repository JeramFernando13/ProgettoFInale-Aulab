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


import { platformUrl } from "../config";

export default function PlatformsDropDown() {
  const [platforms, setPlatforms] = useState(null);
  // const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const response = await fetch(platformUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setPlatforms(json);
    } catch (error) {
      setError(error.message);
      setPlatforms(null);
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
          <List>
             {platforms && platforms.results.map((platform) => (
               <ListItem key= {platform.id}>
            
            <div>
              <Typography variant="h6" color="blue-gray">
                <Link to={`/games/${platform.slug}`}>{platform.name}</Link>
                
              </Typography>
              
            </div>
          </ListItem>
            ))}
            </List>
        </ul>
       
      </AccordionBody>
      
    </>
  );
}

