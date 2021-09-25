import * as actionTypes from './constant';
import { fromJS } from 'immutable';

const data: TSRecommendData.TSDateObj = {
  bannerList: [],
  recommendList: [],
  enterLoading: true
}

const defaultState = fromJS(data) as TSRecommendData.ObjType

export interface actionType {
  data: any,
  [name: string]: any
}


// eslint-disable-next-line import/no-anonymous-default-export
export default ((state = defaultState, action: actionType ) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set("bannerList", action.data)
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set("recommendList", action.data)
    case actionTypes.CHANGE_ENTER_LOADING: 
      return state.set("enterLoading", action.data)
    default:
      return state
  }
})

