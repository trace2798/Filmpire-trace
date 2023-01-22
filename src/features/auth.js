import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isAuthenticated: false,
    sessionId: ""
}

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionId = localStorage.getItem("session_id");
            localStorage.setItem("accountId", action.payload.id);
        }
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

//where we get the entire state and only pull the user out of it. We did similar stuff to get the genre in Movies.jsx 
export const userSelector = (state) => state.user;

//after creating the slice we need to connect it(reducer) to the store. 