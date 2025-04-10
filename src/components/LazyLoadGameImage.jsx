import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {
    return(
        <LazyLoadImage
            alt='game name'
            effect="blur"
            wrapperProps={{
                style: {transitionDelay: "0.5s"}
            }}
            src={image}
            className="w-full h-full object-cover transition duration-100 ease-in-out transform hover:scale-110"
        />
    );
};
