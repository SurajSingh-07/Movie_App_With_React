import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    document.title = "MovieApp | HomePage";
    
    return <>
        <div className="w-[20%] h-full border-r-2 border-zinc-200 p-10">
            <h1 className="text-3xl text-white font-bold">
            <i className="text-[#6556CD] ri-movie-line mr-2"></i>
            <span className="text-2xl">MOVIEAPP</span>
            </h1>
            <nav className="flex flex-col text-zinc-400 text-xl gap-3 mb-2">
                <h1 className="text-white font-semibold text-xl mt-10 mb-5">
                    New Feeds
                </h1>
                <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white p-5 rounded-lg duration-300"><i className="ri-fire-fill"></i> Trending</Link>
                <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white p-5 rounded-lg duration-300"><i className="ri-bard-fill"></i> Popular</Link>
                <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white p-5 rounded-lg duration-300"><i className="ri-movie-line"></i> Movies</Link>
                <Link to="/tv" className="hover:bg-[#6556CD] hover:text-white p-5 rounded-lg duration-300"><i className="ri-tv-fill"></i> TV Shows</Link>
                <Link to="/person" className="hover:bg-[#6556CD] hover:text-white p-5 rounded-lg duration-300"><i className="ri-team-fill"></i> People</Link>
            </nav>

            <hr className="border-none h-[1px] bg-zinc-400"/>

            <nav className="flex flex-col text-zinc-400 text-xl gap-3">
                <h1 className="text-white font-semibold text-xl mt-10 mb-5">
                    Website Info
                </h1>
                <Link className="hover:bg-[#6556CD] hover:text-white p-5 rounded-lg duration-300"><i className="ri-phone-fill"></i> Contact Us</Link>
                <Link className="hover:bg-[#6556CD] hover:text-white p-5 rounded-lg duration-300"><i className="ri-information-fill"></i> About</Link>
            </nav>
        </div>
    </>
}

export default Home