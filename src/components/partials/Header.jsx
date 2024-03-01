import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
      }}
      className="w-full h-[70vh] flex flex-col justify-end items-start p-[7%]"
    >
      <h1 className="w-[60%] text-5xl font-black text-white">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[60%] mt-3 mb-3 text-white">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
      </p>
      <p className="text-white mb-2">
        <i className=" text-yellow-500 ri-megaphone-fill"></i>{" "}
        {data.release_date || "No Info."}
        <i className="ml-5 text-yellow-500 ri-album-fill"></i>{" "}
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="bg-[#6556CD] p-2 rounded ">Watch Trailer</Link>
    </div>
  );
};

export default Header;
