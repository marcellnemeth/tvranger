import axios from 'axios';

const ROOT_URL = 'https://api.themoviedb.org/3/search/tv';

const SHOW_URL = 'https://api.themoviedb.org/3/tv/';
const API_KEY = '?api_key=80b04793ba28e84d279ca32b835a81b7';



export const fetchShow = (term, page) => {
  const request = axios.get(`${ROOT_URL}${API_KEY}&query=${term}&page=${page}`);
  return {
    type: 'FETCH_SHOW',
    payload: request
  };
};

export const fetchPopularShows = (page) => {
  const request = axios.get(`${SHOW_URL}popular${API_KEY}&page=${page}`);
  
  return {
    type: 'FETCH_POPULAR_SHOW',
    payload: request
  }
}

export function fetchShowWithId(id) {
  const request = axios.get(`${SHOW_URL}${id}${API_KEY}`);
  return {
    type: 'FETCH_SHOW_WITH_ID',
    payload: request
  };
}


export function fetchShowWatchlist(id) {
  const request = axios.get(`${SHOW_URL}${id}${API_KEY}`);
  return {
    type: 'FETCH_SHOW_WATCHLIST',
    payload: request
  };
}

export function fetchShowCredits(id) {
  const request = axios.get(`${SHOW_URL}${id}/credits${API_KEY}`);

  return {
    type: 'FETCH_SHOW_CREDITS',
    payload: request
  };
}


export function fetchCommentsByShowId(showId){
  const request = axios.get(`http://localhost:5000/api/comment/show/${showId}`,{
    headers: {'Authorization': localStorage.getItem("accessToken")?"Bearer " 
    + localStorage.getItem("accessToken"):null}
  });

  return {
    type: "FETCH_COMMENTS",
    payload: request
  }
}

export function getCurrentUser(){
  const request = axios.get("http://localhost:5000/api/user/currentuser",{
    headers: {'Authorization': localStorage.getItem("accessToken")?"Bearer " 
    + localStorage.getItem("accessToken"):null}
  });

  return {
    type: "FETCH_CURRENTUSER",
    payload: request
  }
}
export function getWatchlist(){
  const request = axios.get("http://localhost:5000/api/watchlist/all",{
    headers: {'Authorization': localStorage.getItem("accessToken")?"Bearer " 
    + localStorage.getItem("accessToken"):null}
  });

  return {
    type: "FETCH_WATCHLIST",
    payload: request
  }
}

export function clearWatchlist(){
  return {
    type: "CLEAR",
    payload: []
  }
}