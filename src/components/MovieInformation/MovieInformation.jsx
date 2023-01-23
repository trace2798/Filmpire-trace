import React, {useState} from 'react'
import { Modal, Typography, Button, ButtonGroup, CircularProgress, Grid, Box, useMediaQuery, Rating } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorder, Remove, ArrowBack, FavoriteBorderOutlined } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useGetMovieInformationQuery, useGetMovieRecommendationQuery } from '../../services/TMDB'
import useStyles from './styles';
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import genreIcons from '../../assets/genres';
import { MovieList } from '../index';


const MovieInformation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  //we will use usePrams to get the movie id
  const { id } = useParams();

  const { data, error, isFetching } = useGetMovieInformationQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetMovieRecommendationQuery({ list: 'recommendations', movie_id: id});
  
  const isMovieFavorited = false;
  const isMovieWatchlisted = false;
  const addToFavorites = () => {

  };
  const addToWatchList = () => {

  }; 
  // const recommendations = () => {

  // };
 
  
  
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
  
  console.log('recommendation:', recommendations);
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
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>Overview</Typography>
        <Typography style={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {data && data?.credits?.cast?.map((character, i) => (
            character.profile_path && (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img
                className={classes.castImage}
                src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                alt={character.name}
              />
              <Typography color="textPrimary" align="center">{character?.name}</Typography>
              <Typography color="textSecondary" align="center">
                {character.character.split('/')[0]}
              </Typography>
            </Grid>
            )
            // slice will show how many to show.
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem'}}>
          <div className={classes.buttonContainer}>
          <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item={12} sm={6} className={classes.buttonContainer}>
            <ButtonGroup size="small" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined/> : <Favorite/>}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchList} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
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
          You might also like
        </Typography>
        {/* //loop through recommndated movie */}
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry, nothing was found.</Box>} 
      </Box>
      {console.log('data video', data.videos)}
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data.videos.results.length > 0 && (
          <iframe
          autoPlay
          className={classes.video}
          frameBorder="0"
          title="Trailer"
          src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          allow="autoplay"
          />
        )}
      </Modal>

    </Grid>
  )
}

export default MovieInformation;