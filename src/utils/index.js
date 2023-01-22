//Axios is a JavaScript library that allows you to make HTTP requests from the browser or Node.js. 
//With Axios, you can make requests to RESTful APIs and handle the returned data in a way that's similar to the Fetch API, but with additional features such 
//as automatic JSON parsing, error handling, and more.
import axios from 'axios'

export const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params:{
        api_key: process.env.REACT_APP_TMDB_KEY
    }
})
// With the fetchToken function we need to make a call to the movie database.
export const fetchToken = async () => {
    try {
        const {data} = await moviesApi.get('authentication/token/new');
        const token = data.request_token;
        if(data.success) {
            localStorage.setItem('request_token', token);

            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log('Sorry, your token could not be created')
    }
}

export const createSessionID = async () => {
    const token = localStorage.getItem('request_token');
    //Step 3 if token exist we create session id.
    if(token){
        try {
            //at first we had const response but we desytuctured it to just {data} and destructed data to get session_id
            const {data: { session_id}} = await moviesApi.post('/authentication/session/new', {
                request_token: token,
            });
            localStorage.setItem('session_id', session_id);
            return session_id;
        } catch (error) {
            console.log(error);
        }
    }
}