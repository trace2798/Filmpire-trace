import React from 'react'
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';
//We are getting movies as a prop.
const MovieList = ({ movies, numberOfMovies}) => {
    const classes = useStyles();

    console.log('movie list');

  return (
    <Grid container className={classes.moviesContainer}>
        {movies.results.slice(0, numberOfMovies).map((movie, i) => (
            <Movie key={i} movie={movie} i={i}/>
        ))}
        {/* {movies.cast.slice(0, numberOfMovies).map((movie, i) => (
            <Movie key={i} movie={movie} i={i}/>
        ))} */}
    </Grid>
  )
}

export default MovieList