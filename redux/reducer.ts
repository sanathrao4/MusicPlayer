import { combineReducers } from "redux";
import albumSlice from "./slices/albumSlice";
import artistSlice from "./slices/artistSlice";
import trackSlice from "./slices/trackSlice";


export default combineReducers({
    album: albumSlice,
    track: trackSlice,
    artist: artistSlice
})

