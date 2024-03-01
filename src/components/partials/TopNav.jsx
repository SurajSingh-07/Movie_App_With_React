import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp"

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(d)
      setSearches(data.results);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center ">
      <i className="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-200 mx-10 p-3 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="Search Anything..."
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className=" text-zinc-400 text-3xl ri-close-line right-0"
        ></i>
      )}

      <div className="z-[10] absolute w-[50%] max-h-[50vh] top-[100%] left-[7%] bg-zinc-200 overflow-auto rounded">
        {searches.map((s, i) => (
          <Link to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 w-[100%] flex justify-start items-center border-b-2 border-zinc-100 p-10 font-semibold tet-zinc-600"
          >
            <img className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg" 
            src={ s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : noimage } alt="" />
            <span>{s.name || s.title || s.original_name || s.original_title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
