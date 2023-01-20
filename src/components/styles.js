import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    height: '70px',
  },
  content: {
    flexGrow: '1',
    padding: '2em',
  },
}));

//If css property has 2 words like flex-grow, we will write it in camelCase like flexGrow.