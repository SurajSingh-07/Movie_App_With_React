import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadTv, removeTv } from "../store/actions/TvActions";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
      }}
      className="relative w-screen min-h-screen px-[10%] "
    >
      <nav className="w-full text-zinc-100 h-[10vh] flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line"
        ></Link>

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>{" "}
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          {" "}
          imdb{" "}
        </a>
      </nav>

      <div className="w-full flex ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover h-[50vh] mt-4"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl mt-3 font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-xl font-bold text-zinc-200">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-3 mb-5 flex items-center gap-x-5 font-semibold">
            <span className="rounded-full text-lg font-semibold bg-yellow-700 text-white w-[8vh] h-[8vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>{" "}
            </span>
            <h1 className="w-[60px] text-2xl leading-6 ml-[-14px]">
              User Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-2xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-2xl mb-3 mt-5">Overview :</h1>
          <p className="mb-7">{info.detail.overview}</p>

          {/* <h1 className="text-2xl mb-3 mt-5">tv Translated :</h1>
          <p className="mb-10">{info.translations.join(", ")}</p> */}

          <Link
            className="p-3 bg-[#6556cd] rounded-lg"
            to={`${pathname}/trailer`}
          >
            <i className="text-xl ri-play-fill "></i> Play Trailer
          </Link>
        </div>
      </div>

      <div className="w-[80%] flex flex-col gap-y-1 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-5 items-center text-white">
            <h1>Available on Platforms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        <div className="mt-5">
          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-x-5 items-center text-white">
              <h1>Available on Rent</h1>
              {info.watchproviders.rent.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-5">
          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-x-5 items-center text-white">
              <h1>Where to Buy</h1>
              {info.watchproviders.buy.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <hr className="my-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-bold text-white">Seasons -</h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5 ">
        {info.detail.seasons.length > 0 ? info.detail.seasons.map((s, i) => (
          <div key={i} className="w-[15vh] mr-[12%]">
            <img 
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover min-w-[14vw] h-[40vh]"
              src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
              alt=""
            />
            <h1 className="text-2xl text-zinc-200 mt-3 font-semibold">
              {s.name}
            </h1>
          </div>
        )) : <h1 className="text-3xl mt-5 text-white font-black text-center">Nothing to Show</h1>}
      </div>

      <hr className="my-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-bold text-white">
        Recommendations and Similars -
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
