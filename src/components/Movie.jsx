import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import TopNav from "./partials/TopNav";

const Movie = () => {
    document.title = "MOVIEAPP | Movies"
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
  
    const getMovie = async () => {
      try {
        const { data } = await axios.get(`/movie/${category}?page=${page}`);
  
        if (data.results.length > 0) {
          setmovie((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        }else{
          sethasMore(false);
        }
        
      } catch (error) {
        console.log("Error : ", error);
      }
    };
  
    const refreshHandler = () => {
      if (movie.length === 0) {
        getMovie();
      } else {
        setpage(1);
        setmovie([]);
        getMovie();
      }
    };
  
    useEffect(() => {
      refreshHandler();
    }, [category]);
  
  
    return movie.length > 0 ? (
      <div className="w-screen h-screen">
        <div className="p-[3%] py-2 w-full flex items-center justify-between">
          <h1 className="text-2xl text-zinc-400 font-semibold">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556cd] ri-arrow-left-line"
            ></i>{" "}
            Movies
          </h1>
          <div className="flex items-center w-[80%]">
            <TopNav />
            <Dropdown
              title="Category"
              options={["popular", "top_rated", "upcoming", "now_playing"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
        </div>
  
        <InfiniteScroll
          dataLength={movie.length}
          next={getMovie}
          hasMore={hasMore}
          loader={<h1>Loading..</h1>}
        >
          <Cards data={movie} title="movie" />
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    );
}

export default Movie