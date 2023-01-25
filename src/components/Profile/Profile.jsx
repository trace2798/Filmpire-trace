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

import React, { useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { ExitToApp } from "@mui/icons-material";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "..";

const Profile = () => {
  const { user } = useSelector(userSelector);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  //for logout we can use .removeItem and call each 3 of them or just use .clear
  const logout = () => {
    localStorage.clear();
    //once we clear  we reload the page.
    window.location.href = "/";
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" guttenBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {/* //!favouriteMovies.length means there is no favourite movie. */}
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add Favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favourite Movies" movies={favoriteMovies} />
          <RatedCards title="Watchlist Movies" movies={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
