//My solution and solution is showing expected results.

import React from 'react'
import { useGetActorInformationQuery, useGetMovieByActorNameQuery } from '../../services/TMDB';
import useStyles from './styles'
import { useParams, Link } from 'react-router-dom';
import { Modal, Typography, Button, ButtonGroup, CircularProgress, Grid, Box, useMediaQuery, Rating } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorder, Remove, ArrowBack, FavoriteBorderOutlined } from '@mui/icons-material'
import { MovieList } from '../index';


const Actors = () => {
    const classes = useStyles();
    const {id} = useParams();
    const { data, error, isFetching } = useGetActorInformationQuery(id);
    const { data: movieList, isFetching: isFetchingMovieList} = useGetMovieByActorNameQuery({ list: 'discover', person_id: id});
  
    if (isFetching) {
      return (
        <Box display="flex" justifyContent="center">
          <CircularProgress size="4rem" />
        </Box>
      );
    }
    console.log(data)
    if(!data){
      return (
        <h4>
          No person with this id exist on database.
        </h4>
        ) 
    }  
    if (error) return "An error occurred";
    {console.log('inside grid in actor:', data)}
    
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
       <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          alt={data?.name}
        /> 
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {`Born: ${data?.birthday}`}
        </Typography> 
        
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Biography
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.biography}
        </Typography>
        
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  variant="contained"
                >
                  IMDB
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="text">
                <Button startIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography variant="subtitle2" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          Movies
        </Typography>
        {/* {`${movieList?.cast[0].title}`} */}
        {/* //loop through movieList of the person */}
        {movieList
          ? <MovieList movies={movieList} numberOfMovies={12} />
          : <Box>Sorry, nothing was found.</Box>
        } 
      </Box>
    </Grid>
  )
}

export default Actors;

