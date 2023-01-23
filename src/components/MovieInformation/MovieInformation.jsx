import React from 'react'
import { Modal, Typography, Button, ButtonGroup, CircularProgress, Grid, Box, useMediaQuery, Rating } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favourite, FavouriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useGetMovieInformationQuery } from '../../services/TMDB'
import useStyles from './styles';
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import genreIcons from '../../assets/genres';


const MovieInformation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log('Movie Information')
  //we will use usePrams to get the movie id
  const { id } = useParams();

  const { data, error, isFetching } = useGetMovieInformationQuery(
    id
  );

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
        Id does not match with any on database.
      </h4>
      ) 
  }
  // if (!data.id) {
  //   return (
  //     <Box display="flex" alignItems="center" mt="20px">
  //       <Typography variant="h4">
  //         No Movies that match that name
  //         <br />
  //         Please search for something else.
  //       </Typography>
  //     </Box>
  //   );
  // }

  if (error) return "An error occurred";
  
  return (
    <Grid container className={classes.containerSpaceAround}>
      {/* {data.overview} */}
      <Grid item sm={12} lg={4}>
       <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        /> 
      </Grid>
      <Grid item container direction="column" lg={7}>
      <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '10px' }}>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          {/* <Typography gutterBottom variant="h6" align="center">{data?.runtime}min {data?.spoken_language.length > 0 ? `/ ${data?.spoken_languages[0].name}` : ''}  </Typography> */}
          <Typography gutterBottom variant="h6" align="center">{data?.runtime}min</Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link className={classes.links} key={genre.name} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">{genre?.name}</Typography>
            </Link>
          ))}
        </Grid>
        
      </Grid>
    </Grid>
  )
}

export default MovieInformation;