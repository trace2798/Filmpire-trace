import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
// const page = 1; 
//https://api.themoviedb.org/3/movie/550?api_key=10b233f03c98d1d6d6ffbe7e96c884ca
//https://redux-toolkit.js.org/rtk-query/overview

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    //Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        console.log("TMDB here");
        //Get Movies by search
        if(searchQuery) {
          return `search/movie?api_key=${tmdbApiKey}&query=${searchQuery}&page=${page}`;
        }
        //Get movies by category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "string") { 
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        //Get movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "number") {
          // return `discover/movie?with_genres=${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
          return `discover/movie?api_key=${tmdbApiKey}&page=${page}&with_genres=${genreIdOrCategoryName}`;          
        }
        //Get Popular movie
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    //Get movie information
    getMovieInformation: builder.query({
      query: (id) => {
          return `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`;
      }
    }),

  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieInformationQuery } = tmdbApi;

//"typeof" term is important, without it the if statements were not working. 
