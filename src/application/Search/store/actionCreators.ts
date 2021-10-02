import { SET_ENTER_LOADING, SET_HOT_KEYWRODS, SET_RESULT_SONGS_LIST, SET_SUGGEST_LIST } from './constants'
import { fromJS } from 'immutable'
import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest  } from '../../../api/request'

const changeHotKeyWords = (data: Array<TSHot.DataArr>) => ({
    type: SET_HOT_KEYWRODS,
    data: fromJS(data)
})

const changeSuggestList = (data: TSSuggest.RespRes) => ({
    type: SET_SUGGEST_LIST,
    data: fromJS(data)
})

const changeResultSongs = (data: Array<TSSuggest.SongeData>) => ({
    type: SET_RESULT_SONGS_LIST,
    data: fromJS(data)
})

export const changeEnterLoading  = (data: boolean) => ({
    typE: SET_ENTER_LOADING,
    data
})

export const getHotKeyWords = () => {
    return async (dispatch: any) => {
        let data = await getHotKeyWordsRequest()
        let list = data.result.hots
        dispatch(changeHotKeyWords(list))
    }
}

export const getSuggestList = (query: string) => {
    return async (dispatch: any) => {
        let data = await getSuggestListRequest(query)
        if (!data) return
        let res = data.result || {}
        dispatch(changeSuggestList(res))
        let dataOne = await getResultSongsListRequest(query)
        if (!dataOne) return
        let resOne = dataOne.result.songs || []
        dispatch(changeResultSongs(resOne))
        dispatch(changeEnterLoading(false))
    }
}
