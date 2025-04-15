import React from 'react';

const Footer = () => {
  return (
    <section className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <footer className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
          <h3 className="mt-8 text-base leading-6 text-center text-gray-400">
          Rehacktor
        </h3>
            <a href="https://www.linkedin.com/in/jeram-fernando-developer/" target='_blank' className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Jeram Fernando 
            </a>
          </div>
          {/* Aggiungi gli altri link qui seguendo lo stesso schema */}
        </footer>
        <div className="flex justify-center mt-8 space-x-6">
          
          {/* Aggiungi le altre icone social qui seguendo lo stesso schema */}
        </div>
       
      </div>
    </section>
  );
};
export default Footer;