import { createSlice } from '@reduxjs/toolkit'

export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState:{
        genreIdOrCategoryName: '',
        page: 1,
        searchQuery: '',
    },
    reducers: {
        selectGenreOrCategory: (state, action) => {
            // console.log(action.payload)
            // state.push(action.payload)
            state.genreIdOrCategoryName = action.payload;
            
            state.searchQuery = '';
        }
    }
})

export const { selectGenreOrCategory } = genreOrCategory.actions;

export default genreOrCategory.reducer;
//whenever we have a reducer we need to attach it to the store(folder.app=>store.js)