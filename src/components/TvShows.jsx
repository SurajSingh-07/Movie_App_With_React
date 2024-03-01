import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import TopNav from "./partials/TopNav";

const TvShows = () => {
    document.title = "MOVIEAPP | Tv Shows"
    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today");
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
  
    const getTv = async () => {
      try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
  
        if (data.results.length > 0) {
          settv((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        }else{
          sethasMore(false);
        }
        
      } catch (error) {
        console.log("Error : ", error);
      }
    };
  
    const refreshHandler = () => {
      if (tv.length === 0) {
        getTv();
      } else {
        setpage(1);
        settv([]);
        getTv();
      }
    };
  
    useEffect(() => {
      refreshHandler();
    }, [category]);
  
  
    return tv.length > 0 ? (
      <div className="w-screen h-screen">
        <div className="p-[3%] py-2 w-full flex items-center justify-between">
          <h1 className="text-2xl text-zinc-400 font-semibold">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556cd] ri-arrow-left-line"
            ></i>{" "}
            Tv Shows
          </h1>
          <div className="flex items-center w-[80%]">
            <TopNav />
            <Dropdown
              title="Category"
              options={["popular", "top_rated", "on_the_air", "airing_today"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
        </div>
  
        <InfiniteScroll
          dataLength={tv.length}
          next={getTv}
          hasMore={hasMore}
          loader={<h1>Loading..</h1>}
        >
          <Cards data={tv} title="tv" />
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    );
}

export default TvShows