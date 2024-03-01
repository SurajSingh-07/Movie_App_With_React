export { removePerson } from "../reducers/personSlice";
import axios from "../../utils/axios";
import { loadPerson } from "../reducers/personSlice";

export const asyncloadPerson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    
    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };

    dispatch(loadPerson(theultimatedetails));
    // console.log(theultimatedetails)
  } catch (error) {
    console.log("Error : ", error);
  }
};
