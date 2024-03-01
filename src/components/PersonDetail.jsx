import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadPerson, removePerson } from "../store/actions/personActions";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";
import Dropdown from "./partials/Dropdown";

const PersonDetail = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie")

  console.log(info)
  useEffect(() => {
    dispatch(asyncloadPerson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  return info ? (
    <div className="p-[2%] w-screen">
      <nav className="w-full text-zinc-100 h-[10vh] flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex">
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover h-[50vh]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="my-10 border-none h-[2px] bg-zinc-500" />

          <div className="text-2xl text-white flex gap-x-10">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          <h1 className="text-2xl text-zinc-400 font-semibold my-5">Personal Info -</h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Known for :</h1>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender :</h1>
          <h1 className="text-zinc-400">{info.detail.gender === 2 ? "Male" : "Female"}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday :</h1>
          <h1 className="text-zinc-400">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday :</h1>
          <h1 className="text-zinc-400">{info.detail.deathday ? "info.detail.deathday" : "Still Alive"}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Place of Birth :</h1>
          <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Also Known as :</h1>
          <h1 className="text-zinc-400">{info.detail.also_known_as.join(", ")}</h1>
        </div>

        <div className="w-[80%] ml-[5%]">
        <h1 className="text-6xl text-zinc-400 font-black my-5">{info.detail.name}</h1>
          <h1 className="text-xl text-zinc-400 font-semibold">Biography :</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <h1 className="text-xl text-zinc-400 font-semibold mt-5">Known For :</h1>
          <HorizontalCards data={info.combinedCredits.cast}/>

          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">
              Acting
            </h1>

            <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setcategory(e.target.value)}/>
          </div>

          <div className="list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto mt-5 shadow-lg shadow-[rgba(255,255,255,0.2)] border-2 border-zinc-700 p-5">

              {info[category + "Credits"].cast.map((c, i) => (
                <li key={i} className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer">
                <Link to={`/${category}/details/${c.id}`}>
                  <span>{c.name || c.title || c.original_name || c.original_title}</span>
                  <span className="block ml-5">
                    {c.character && `Character Name : ${c.character}`}
                  </span>
                </Link>
              </li>
              ))}

          </div>

        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetail;
