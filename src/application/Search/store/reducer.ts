import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultJS: TSSearch.ReducerDefaultData =  {
    hotList: [],
    suggestList: {
        albums: [],
        order: [],
        playlists: [],
        songs: [],
        artists: {}
    },
    songsList: [],
    enterLoading: false
}

const defaultState: any = fromJS(defaultJS)

export default (state = defaultState, action: TSSearch.ActionTypeProps) => {
    switch (action.type) {
        case actionTypes.SET_HOT_KEYWRODS:
            return state.set('hotList', action.data)
        case actionTypes.SET_SUGGEST_LIST: 
            return state.set('suggestList', action.data)
        case actionTypes.SET_RESULT_SONGS_LIST: 
            return state.set('songsList', action.data)
        case actionTypes.SET_ENTER_LOADING: 
            return state.set('enterLoading', action.data)
        default:
            return state
    }
}