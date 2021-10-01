import { combineReducers  } from "redux-immutable";
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from "../application/Singers/store";
import { reducer as rankReducer } from '../application/Rank/store';
import { reducer as albumReducer } from '../components/Album/store';
import { reducer as singerReducer } from "../components/Singer/store";
import { reducer as playerReducer } from "../application/Player/store/index";
export default combineReducers ({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerReducer,
  player: playerReducer
})
