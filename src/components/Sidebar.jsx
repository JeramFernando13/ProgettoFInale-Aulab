import React from "react";

import GenresDropDown from '../components/GenresDorpDown'
import PlatformsDropDown from "./PlatformsDropDown";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

 
export default function Sidebar() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="sideCust h-full min-h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 hidden lg:block">
      <div className="mb-2 flex items-center gap-4 p-4">
        {/* <img src="public/images/logoReHacktor.png" alt="brand" className="h-10 w-10" /> */}
        <Typography variant="h5" color="blue-gray">
         
        </Typography>
      </div>
      <List className="">

        <Accordion open = {open === 1} icon={
            <ChevronDownIcon strokeWidth={2.5} 
            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 mt-4">
              <ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               🕹️ 
              </Typography>
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
               Genres
              </Typography>
            </AccordionHeader>
          </ListItem>
       
          <AccordionBody className="py-1">
           <GenresDropDown />
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                🎮 
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                 Platforms
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <PlatformsDropDown />
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        
      </List>
    </Card>
  );
}