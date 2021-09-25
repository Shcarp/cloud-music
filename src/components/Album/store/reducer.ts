import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultStateJS: Album.ReducerData = {
  currentAlbum: {
    coverImgUrl: "",
    creator: {
      avatarUrl: "",
      nickname: "",
    },
    description: "",
    id: 0,
    name: "",
    subscribedCount: -1,
    tracks: []
  },
  enterLoading: false
}

const defaultState = fromJS(defaultStateJS) as Album.IMReducerData

// eslint-disable-next-line import/no-anonymous-default-export
export default (state= defaultState, action: { type: any; data: any; }) => {
  switch(action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      return state.set('currentAlbum', action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set("enterLoading", action.data)
    default:
      return state
  }
}
  