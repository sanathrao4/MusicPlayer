import { createSlice, createSelector } from "@reduxjs/toolkit";

// export interface AlbumData {
//     id: string,
//     name: string,
//     trackCount: string | number,
//     originallyRelease: string,
//     artistName: string
// }
const initialState = {
    albums: [],
    limit: 10
}
const albumSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAlbumList: (state, action) => {
            let temp = [...action.payload.albumList]
            state.albums = temp
            state.limit = action.payload.limit
        }
    }
})


export const { setAlbumList } = albumSlice.actions


export default albumSlice.reducer