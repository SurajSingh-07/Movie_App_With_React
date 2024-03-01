import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2NmNWM3NjhkZDY1YTE3NzQ1NjU4Nzc2ZjllY2JjMiIsInN1YiI6IjY1ZGM2YjFmMDNiZjg0MDE2MWFlYWZhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZqcKR65XV1p6U2H1Haul-r3hLT99ySDj5lBsGDktr_0",
  },
});

export default instance;