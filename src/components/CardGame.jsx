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
        className="grid w-96 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl mt-6 "
        key={game.id}
      >
        <CardHeader color="blue-gray" className="relative h-56 rounded-t-lg overflow-hidden">
          {/* <LazyLoadGameImage image = {image}  */}
            <img src={game.background_image} alt={game.name} className="w-full h-full object-cover transition duration-300 ease-in-out transform hover:scale-110"
          />
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
         <Button variant="filled" size="md" className="transition-transform transform hover:scale-105 border">
          <Link to={`/games/${game.slug}/${game.id}`}></Link>
         </Button>
        </CardFooter>
      </Card>
    );
}