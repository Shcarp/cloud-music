import { fromJS } from "immutable";
import { getRankListRequest } from "../../api/request";

export const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST';
export const CHANGE_LOADING = 'home/rank/CHANGE_LOADING';

const changeRankList = (data: Array<TSRankData.RankData>) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data) as TSRankData.ListData
})
const changeLoading = (data: boolean) => ({
  type: CHANGE_LOADING,
  data
})

export const getRankList = () => {
  return (dispatch: (arg0: { type: string; data: any; }) => void) => {
    getRankListRequest().then(data => {
      let list = data && data.list
      // console.log(list)
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    })
  }
}

const defaultState: TSRankData.DefaultProps =  {
  rankList: [],
  loading: true
}

const defaultStateF = fromJS(defaultState) as TSRankData.MapData

const reducer = (state = defaultStateF, action: TSRankData.ActionType) => {
  switch (action.type) {
    case CHANGE_RANK_LIST: 
      return state.set('rankList', action.data)
    case CHANGE_LOADING: 
      return state.set('loading', action.data)
    default:
      return state
  }
} 

export { reducer }
