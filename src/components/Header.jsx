'use client'
import {useContext, React} from 'react';
import { useState, useEffect } from 'react'

import GenresDropDown from '../components/GenresDorpDown'
import PlatformsDropDown from "./PlatformsDropDown";

import { Link } from 'react-router'
//! import supabase from '../supabase/supabase-client';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Searchbar from './SearchBar'
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



export default function Header() {
  const [session, setSession] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = React.useState(0);
  
  const [showNavbar, setShowNavbar] = useState(true);

  // const {session} = useContext(SessionContext); 
   
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const getSession = async () => {
    const {data, error } = await supabase.auth.getSession();
    if (error) setSession(null);
    console.log(data);
    setSession(data);
  };

  const singOut = async () => {
    const {error} = await supabase.auth.singOut()
    if (error) console.log(error);
    alert('Signed out ')
    getSession();
    
  }

  useEffect (() => {
    getSession();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Nascondi la navbar quando si scorre verso il basso
        setShowNavbar(false);
      } else {
        // Mostra la navbar quando si scorre verso l'alto
        setShowNavbar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    
  }, []);

  return (
    <>
    
      <header className="bg-white">
        <nav aria-label="Global" className={`navbar navCust mx-auto flex max-w items-center justify-between p-6 lg:px-8 ${showNavbar ? "visible" : "hidden"}`}>
          {/* logo  */}
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="public/images/logoReHacktor.png"
                className="h-12 w-auto"
              />
            </Link>
          </div>
            
          {/* Account  */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* search bar  */}
          <PopoverGroup className="hidden  lg:flex lg:gap-x-12">
            <Searchbar className=' items-center lg:flex lg:flex-1 lg:justify-end' />
          </PopoverGroup>
            {/* Account  */}
          <Popover className=" hidden  lg:flex lg:gap-x-12">
            <PopoverButton className="flex ml-15 gap-x-1 text-sm/6 font-semibold text-gray-900">
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              Account
            </PopoverButton>

            <PopoverPanel
              transition
              className=" absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
              {/* condizione session  */}
              {session ? (
                <div className="p-4">
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50">
                      
                    <div className="flex-auto">
                      <Link to='/account' className="block font-semibold text-gray-900">
                        Account Settings
                        <span className="absolute inset-0" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6  hover:bg-gray-50 hover:text-center">
                    
                    <div className="flex-auto">
                      <Link to='/' onClick={singOut} className="block font-semibold text-red-500">
                        Log Out
                        <span className="absolute inset-0" />
                      </Link>
                    </div>
                  </div>
                </div>
              ): (
                <div className="p-4">
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50">
                    
                    <div className="flex-auto">
                      <Link to="/login" className="block font-semibold text-gray-900">
                        Login
                        <span className="absolute inset-0" />
                      </Link>
                    </div>
                  </div>
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6  hover:bg-gray-50 ">
                    
                    <div className="flex-auto">
                      <Link to="/register" className="block font-semibold text-gray-900">
                        Sign Up
                        <span className="absolute inset-0" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
                
              
            </PopoverPanel>
          </Popover> 
        </nav>
        {/* on mobile  */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="public/images/logoReHacktor.png"
                  className="h-12 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Searchbar />
                </div>
                {/* accordions  */}
                <List>

                  <Accordion open = {open === 1} icon={
                      <ChevronDownIcon strokeWidth={2.5} 
                      className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                      />
                    }
                  >
                    <ListItem className="p-0" selected={open === 1}>
                      <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
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

                {session ? (
                  <div className="py-6">
                      {/* da fare la modale  */}
                    <Link to="/" onClick={singOut} className="text-red-500 -mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Logout
                    </Link>
                  </div>
                ) : ( 
                  
                  <div className="py-6">
                    <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Login
                    </Link>
                    <Link to="/register" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  )
}
