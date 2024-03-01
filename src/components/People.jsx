import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import TopNav from "./partials/TopNav";

const People = () => {
    document.title = "MOVIEAPP | People"
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [people, setpeople] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
  
    const getPeople = async () => {
      try {
        const { data } = await axios.get(`/person/${category}?page=${page}`);
  
        if (data.results.length > 0) {
          setpeople((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        }else{
          sethasMore(false);
        }
        
      } catch (error) {
        console.log("Error : ", error);
      }
    };
  
    const refreshHandler = () => {
      if (people.length === 0) {
        getPeople();
      } else {
        setpage(1);
        setpeople([]);
        getPeople();
      }
    };
  
    useEffect(() => {
      refreshHandler();
    }, [category]);
  
  
    return people.length > 0 ? (
      <div className="w-screen h-screen">
        <div className="p-[3%] py-2 w-full flex items-center justify-between">
          <h1 className="text-2xl text-zinc-400 font-semibold">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556cd] ri-arrow-left-line"
            ></i>{" "}
            Peoples
          </h1>
          <div className="flex items-center w-[80%]">
            <TopNav />
          </div>
        </div>
  
        <InfiniteScroll
          dataLength={people.length}
          next={getPeople}
          hasMore={hasMore}
          loader={<h1>Loading..</h1>}
        >
          <Cards data={people} title="person" />
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    );
}

export default People