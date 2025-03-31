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
            <a href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              About
            </a>
          </div>
          {/* Aggiungi gli altri link qui seguendo lo stesso schema */}
        </footer>
        <div className="flex justify-center mt-8 space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              {/* Inserisci il percorso dell'icona qui */}
            </svg>
          </a>
          {/* Aggiungi le altre icone social qui seguendo lo stesso schema */}
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © 2025 NomeAzienda, Inc. Tutti i diritti riservati.
        </p>
      </div>
    </section>
  );
};

export default Footer;