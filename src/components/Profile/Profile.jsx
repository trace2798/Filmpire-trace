//This is my solution to the assignment. It is a bit different from the solution but correct.
// import React from 'react'
// import { useSelector } from 'react-redux';
// import { userSelector} from "../../features/auth";

// const Profile = () => {
    
//   const { isAuthenticated, user } = useSelector(userSelector)
//   console.log('Profile Here', user);
//   return (
//     <div>
//       {/* GEt access to profile name or id from redux state 
//       display it here */}
//       {isAuthenticated ? (
//               <div>
//                 <h1>Username: {user.username}</h1>
//                 <h1>UserId: {user.id}</h1>
//               </div>
//             ) : (
//               <div>
//                 User not Authenticated.
//               </div>
//             )}

//     </div>
//   )
// }

// export default Profile;

import React, {useEffect} from 'react'
import { Typography, Button, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { userSelector } from '../../features/auth'
import { ExitToApp } from '@mui/icons-material'

const Profile = () => {
  const { user } = useSelector(userSelector);
  //for logout we can use .removeItem and call each 3 of them or just use .clear 
  const favouriteMovies = []

  const logout = () => {
    localStorage.clear();
    //once we clear  we reload the page.
    window.location.href = '/'; 

  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant='h4' guttenBottom>
          My Profile
        </Typography>
        <Button color='inherit' onClick={logout}>
            Logout &nbsp; <ExitToApp/>
        </Button>
      </Box>
      {/* //!favouriteMovies.length means there is no favourite movie. */}
      {!favouriteMovies.length
      ? <Typography variant='h5'>Add Favorites or watchlist some movies to see them here!</Typography>
      : ( <Box>
            FAVOURITE MOVIES
          </Box>
      )}
    </Box>
  )
}

export default Profile