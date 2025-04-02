'use client'

import { useState, useEffect } from 'react'
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

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Header() {
  const [session, setSession] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [showNavbar, setShowNavbar] = useState(true);

  const getSession = async () => {
    const {data, error } = await supabase.auth.getSession();
    if (error) setSession(null);
    console.log(data);
    setSession(data);
  };

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

          <PopoverGroup className="hidden  lg:flex lg:gap-x-12">
             <Searchbar className=' items-center lg:flex lg:flex-1 lg:justify-end' />
          </PopoverGroup>
 
          <Popover className="relative">
            <PopoverButton className="flex ml-15 gap-x-1 text-sm/6 font-semibold text-gray-900">
              Account
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className=" absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
              {/* condizione session  */}
              <div className="p-4">
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50">
                    
                    <div className="flex-auto">
                      <a href='#' className="block font-semibold text-gray-900">
                        Settings
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6  hover:bg-gray-50 hover:text-center">
                    
                    <div className="flex-auto">
                      <a href='#' className="block font-semibold text-red-500">
                        Log Out
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
              </div>
              
            </PopoverPanel>
          </Popover> 
          {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/register" className="mx-2 text-sm/6 font-semibold text-gray-900">
              Log in 
            </Link>
            
            <Link to="/register" className="text-sm/6 font-semibold text-gray-900 ml-2">
              Sign Up 
            </Link>
          </div> */}
        </nav>
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
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Account
                      <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                    
                        <DisclosureButton
                          className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">
                            <a href="#">Settings</a>
                            <br />
                            <a href="#" className='text-red-500' >Logout</a>
                        </DisclosureButton>
                      
                    </DisclosurePanel>
                  </Disclosure>
                  {/* <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a> */}
                    <Searchbar />
                </div>
              
                {session ? (
                  <div className="py-6">

                    <Link to="/register" className="text-red-500 -mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Logout
                    </Link>
                  </div>
                ) : ( 
                  
                  <div className="py-6">
                    <Link to="/register" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
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
