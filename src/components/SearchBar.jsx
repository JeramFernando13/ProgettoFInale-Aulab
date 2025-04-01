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
            <form onSubmit={handleSearch}>
            <fieldset role="group">
                <input
                    type="text"
                    name="search"
                    placeholder={ariaInvalid ? "Devi cercare qualcosa" : "Search a game"}
                    onChange={(event) => setSearch(event, target.value) }
                    value={search}
                    aria-invalid={ariaInvalid}
                    />
                <input type="submit" value="Go" />
            </fieldset>
            </form>


            <form onSubmit={handleSearch} class="flex items-center max-w-sm mx-auto">   
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                        </svg>
                    </div>
                    <input
                type="text"
                name="search"
                placeholder={ariaInvalid ? "Devi cercare qualcosa" : "Search a game"}
                onChange={(event) => setSearch(event, target.value) }
                value={search}
                aria-invalid={ariaInvalid}
                />
                </div>
                <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " value="Go">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </form>

        </>
    );
};  