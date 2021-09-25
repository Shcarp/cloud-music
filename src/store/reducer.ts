import { combineReducers  } from "redux-immutable";
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singerReducer } from "../application/Singers/store";
import { reducer as rankReducer } from '../application/Rank/store';
import { reducer as albumReducer } from '../components/Album/store'
export default combineReducers ({
  recommend: recommendReducer,
  singers: singerReducer,
  rank: rankReducer,
  album: albumReducer,
})