declare namespace TSSearch {
    interface ReducerDefaultData {
        hotList: Array<TSHot.DataArr>
        suggestList: TSSuggest.RespRes
        songsList: Array<TSSuggest.SongeData>
        enterLoading: false
    }
    interface ActionTypeProps {
        type: SET_HOT_KEYWRODS | SET_SUGGEST_LIST | SET_RESULT_SONGS_LIST | SET_ENTER_LOADING 
        data: any
    }
}
