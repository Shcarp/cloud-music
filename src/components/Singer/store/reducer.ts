//store/reducer.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultStateJS: TSSingerProps.StateProps = {
  artist: {
    name: "",
    picUrl: "", 
    briefDesc: "",
  },
  songsOfArtist: [{
    name: "",
    ar: [
      {name: ""}
    ],
    al: {
      name: ""
    }
  }],
  loading: true
}
const defaultState= fromJS(defaultStateJS) as TSSingerProps.StatePropsMap

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: TSSingerProps.StatePropsMap = defaultState , action: TSSingerProps.actionType) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      return state.set('artist', action.data)
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      return state.set('songsOfArtist', action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('loading', action.data)
    default: 
      return state
  }
}