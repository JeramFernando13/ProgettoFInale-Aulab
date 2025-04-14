import { Link } from "react-router";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import LazyLoadGameImage from "./LazyLoadGameImage";

   
  export default function CardGame({ game }) {
    const genres = game.genres.map((genre) => genre.name).join(", ");
    // const {background_image: image} = game;

    return (
      <Card 
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl mt-6"
        key={game.id}>
      <Link to={`/games/${game.slug}/${game.id}`}>
        
          <CardHeader color="blue-gray" className="relative h-56 rounded-t-lg overflow-hidden">
            <LazyLoadGameImage image={game.background_image} />
          </CardHeader>

          <CardBody>
            <Typography variant="h3" color="blue-gray" className="mb-2">
              {game.name}
            </Typography>
            <Typography variant="h5">{genres}</Typography>
            <Typography className="font-normal">{game.released}</Typography>
            <Typography variant="h5">Rating: {game.rating}</Typography>
          </CardBody>

          <CardFooter className="pt-4 pb-6 flex justify-center">
          <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white transition-transform transform hover:scale-105 border rounded-full">
              Show more
          </Button>
          
          </CardFooter>
        </Link>
      </Card>
    );
}