import * as actionTypes from "./constants"
import { fromJS } from 'immutable';
import { playMode } from "../../../api/config";
import { findIndex } from "../../../api/utils"
 
const defaultStateJS: TSPlayProps.PlayProps = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {}
}

const defaultState = fromJS(defaultStateJS) as any

const handleDeleteSong = (state: any, song: TSPlayProps.CurrentSong) => {
  const playList = JSON.parse(JSON.stringify(state.get('playList').toJS()))
  const sequenceList = JSON.parse (JSON.stringify (state.get ('sequencePlayList').toJS ()));
  let currentIndex = state.get ('currentIndex');
  const fpIndex = findIndex(song, playList)
  playList.splice(fpIndex, 1)
  if (fpIndex < currentIndex) currentIndex --
  const fsIndex = findIndex(song, sequenceList)
  sequenceList.splice(fsIndex, 1)
  return state.merge ({
    'playList': fromJS (playList),
    'sequencePlayList': fromJS (sequenceList),
    'currentIndex': fromJS (currentIndex),
  })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action: TSPlayProps.ActionProps) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG: 
      return state.set('currentSong', action.data)
    case actionTypes.SET_FULL_SCREEN: 
      return state.set('fullScreen', action.data)
    case actionTypes.SET_PLAYING_STATE:
      return state.set('playing', action.data)
    case actionTypes.SET_SEQUECE_PLAYLIST:
      return state.set ('sequencePlayList', action.data);
    case actionTypes.SET_PLAYLIST:
      return state.set ('playList', action.data);
    case actionTypes.SET_PLAY_MODE:
      return state.set ('mode', action.data);
    case actionTypes.SET_CURRENT_INDEX:
      return state.set ('currentIndex', action.data);
    case actionTypes.SET_SHOW_PLAYLIST:
      return state.set ('showPlayList', action.data);
    case actionTypes.DELETE_SONG:
      return handleDeleteSong(state, action.data as TSPlayProps.CurrentSong)
    default:
      return state;
  }
}