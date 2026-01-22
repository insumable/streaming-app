import React, {useEffect,useState} from 'react'
import {Search} from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import {Moviecard} from "./components/Moviecard.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMBD_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm,setSearchTerm] = useState('');
    const [movieList,setMoiveList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async(query = '') => {
        setIsLoading(true);

        const endpoint = query?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const response = await fetch(endpoint,API_OPTIONS);
        const data = await response.json();
        setMoiveList(data.results || []);

        setIsLoading(false);

    }

    useEffect(() => {
        fetchMovies(searchTerm);
    }, [searchTerm]);

    return (
        <main>
            <div className= "pattern"/>

            <div className="wrapper">
                <header>
                    <img src ="./hero-img.png"/>
                    <h1>Find <span className="text-gradient">Movies</span> You will Enjoy Without the Hassle</h1>
                    <Search searchTerm ={searchTerm} setSearchTerm = {setSearchTerm}/>
                </header>

                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>
                    {isLoading ? (
                        <Spinner/>
                    ):(
                        <ul>
                            {movieList.map((movie)=>(
                                <Moviecard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                </section>

            </div>
        </main>
    )
}

export default App

