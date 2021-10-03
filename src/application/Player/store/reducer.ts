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

const handleInsertSong = (state: any, song: any) => {
  const playList = JSON.parse(JSON.stringify(state.get("playList").toJS()))
  const sequenceList = JSON.parse(JSON.stringify(state.get('sequencePlayList').toJS()))
  let currentIndex = state.get('currentIndex')
  // 查看是否存在
  let fpIndex = findIndex(song, playList)
  // 如果正好是当前播放的歌曲
  if(fpIndex == currentIndex && currentIndex !== -1) return state
  currentIndex++
  if (playList.length == 0) {
    playList.push(song)
  }else {
    // 把歌曲放入，放在当前歌曲的下一个位置
    playList.splice(currentIndex, 0, song)
  }
  // 如果已经存在歌曲
  if (fpIndex > -1) {
    // 如果老的歌曲的索引小于当前的索引 删除并且index--
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    }else {
      playList.splice(fpIndex + 1, 1)
    }
  }
  let sequenceIndex = findIndex (playList[currentIndex], sequenceList) + 1;
  let fsIndex = findIndex (song, sequenceList);
  // 插入歌曲
  sequenceList.splice (sequenceIndex, 0, song);
  if (fsIndex > -1) {
    // 跟上面类似的逻辑。如果在前面就删掉，index--; 如果在后面就直接删除
    if (sequenceIndex > fsIndex) {
      sequenceList.splice (fsIndex, 1);
      sequenceIndex--;
    } else {
      sequenceList.splice (fsIndex + 1, 1);
    }
  }
  console.log(playList)
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
    case actionTypes.INSERT_SONG:
      return handleInsertSong(state, action.data)
    default:
      return state;
  }
}