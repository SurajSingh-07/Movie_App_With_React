import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

const Cards = ({ data, title }) => {
  console.log(data)
  return (
    <div className="flex flex-wrap w-full h-full px-[5%] pl-[14%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} key={i} className="relative w-[25vh] mr-[5%] mb-[5% ]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover h-[40vh]"
            src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }` : noimage}
            alt=""
          />
          <h1 className="text-2xl text-zinc-200 mt-3 font-semibold">
          {c.name || c.title || c.original_name || c.original_title}
          </h1>

          {c.vote_average && (
            <div className="absolute right-[-10%] bottom-[30%] rounded-full text-lg font-semibold bg-yellow-700 text-white w-[6vh] h-[6vh] flex justify-center items-center">{(c.vote_average * 10).toFixed()} <sup>%</sup> </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
