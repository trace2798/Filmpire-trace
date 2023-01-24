import React from 'react'
import useStyles from './styles'
import { Button, Typography } from '@mui/material';
// import { current } from '@reduxjs/toolkit';

const Pagination = ({ currentPage, setPage, totalPages}) => {
  const classes = useStyles();

  
  if(totalPages === 0) return null;

  const handlePrev = () => {
    if(currentPage !== 1) {
          setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if(currentPage !== totalPages)  {
        setPage((prevPage) => prevPage + 1);
    }
  };   

  return (
    <div className={classes.container}>
        <Button onClick={handlePrev} className={classes.button} variant="contained" color="primary" type="button">Prev</Button>
        <Typography variant='h4' className={classes.pageNumber}>{currentPage}</Typography>
        <Button onClick={handleNext} className={classes.button} variant="contained" color="primary" type="button">Next</Button>
    </div>
  )
}

export default Pagination