import { fromJS } from "immutable";
import * as actionTypes from "./constant";



const defaultDate: TSSingersData.ObjType = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0
}

const defaultState = fromJS (defaultDate) as TSSingersData.MapType

export interface actionType {
  data: any,
  [name: string]: any
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action: actionType) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set("singerList", action.data)
    case actionTypes.CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data);
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data);
    default:
      return state;
  }
}