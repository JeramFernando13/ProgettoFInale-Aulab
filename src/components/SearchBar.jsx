import { useState } from "react";
import { useNavigate } from "react-router";

export default function Searchbar() {

    const navigate = useNavigate();
    const [ search, setSearch ] = useState("");
    const [ariaInvalid, setAriaInvalid]  = useState(null);

    const handleSearch = (event) => {
        event.preventDefault ();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate (`/search?query=${search}`)
            setSearch ("");
        } else {
            setAriaInvalid (true)
        }
    };
    return (
        <>
            <form onSubmit={handleSearch} className="flex items-center max-w-md mx-auto bg-white rounded-full shadow-lg overflow-hidden border border-gray-300">   
                <div className="relative w-full">
                    <input
                        type="text"
                        name="search"
                        className="w-full py-2 px-4 text-gray-700 focus:outline-none"
                        placeholder={ariaInvalid ? "Devi cercare qualcosa" : "Cerca un gioco..."}
                        onChange={(event) => setSearch(event.target.value)}
                        value={search}
                        aria-invalid={ariaInvalid}
                    />
                </div>
                <button type="submit" className="p-2.5 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </button>
            </form>
        </>
    );
};