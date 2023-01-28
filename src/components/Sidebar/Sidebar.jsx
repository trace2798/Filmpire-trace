import { useEffect } from "react"
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom'
import { useTheme} from '@mui/styles'
import { useGetGenresQuery } from "../../services/TMDB";
import useStyles from './styles'
import genreIcons from '../../assets/genres'
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory }  from "../../features/currentGenreOrCategory";

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];



//it will accept one prop which we are passing it from Navbar (setMobileOpen) which we need to destructure.
const Sidebar = ({ setMobileOpen }) => {
    const theme = useTheme();
    const classes = useStyles();
    const { data, isFetching } = useGetGenresQuery();
    //it will allow us to dispatch action
    const dispatch = useDispatch();
    

    const {genreIdOrCategoryName} = useSelector((state) => state.currentGenreOrCategory);
     
    useEffect(() => {
        setMobileOpen(false);
        }, [genreIdOrCategoryName]);

    

  return (
    <>
    <Link to="/" className={classes.imageLink}>
    <img
        className={classes.image}
        src={theme.palette.mode === 'light' ? blueLogo : redLogo}
        alt='Filmpire logo'
    />
    </Link>
    <Divider/>
    <List>
        <ListSubheader>
            Categories
        </ListSubheader> 
        {categories.map(({label, value}) => (
            <Link key={value} className={classes.links} to="/">
                <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                    <ListItemIcon>
                        <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} />
                    </ListItemIcon>
                    <ListItemText primary={label}/>
                </ListItem>
            </Link>
        ))}
    </List>
    <Divider/>
    <ListSubheader>Genre</ListSubheader>
    {/* we are cheching is we are fetching then show loading else data */}
    {isFetching ? (
        <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    ) : data.genres.map(({name, id}) => (
            <Link key={id} className={classes.links} to="/">
                <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                    <ListItemIcon>
                        <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
                    </ListItemIcon>
                    <ListItemText primary={name}/>
                </ListItem>
            </Link>
        ))}
    </>
  )
}

export default Sidebar

//To set movie by genre we have to use the onClick set up above.To make it work we have to use a part of redux without redux toolkit. We have to dispatch a real action call and then that action is going to change the id of the movie category we want to see. 