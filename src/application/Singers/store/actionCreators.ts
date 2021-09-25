import { getHotSingerListRequest, getSingerListRequest } from "../../../api/request";

import * as ActionType from "./constant"
import { fromJS } from "immutable";

const changeSingerList = (data: TSSingersData.singerList) => ({
  type: ActionType.CHANGE_SINGER_LIST,
  data: fromJS(data) as TSSingersData.ArrList
})

export const changePageCount = (data: number) => ({
  type: ActionType.CHANGE_PAGE_COUNT,
  data
})

export const changeEnterLoading = (data: boolean) => ({
  type: ActionType.CHANGE_ENTER_LOADING,
  data
})

export const changePullUpLoading  = (data: boolean) => ({
  type: ActionType.CHANGE_PULLUP_LOADING,
  data
})

export const changePullDownLoading = (data: boolean) => ({
  type: ActionType.CHANGE_PULLDOWN_LOADING,
  data
})

/**
 * 第一次加载热门歌手
 */
 export const getHotSingerList = () => {
   return (dispatch: (arg0: { type: string; data: unknown; }) => void) => {
    getHotSingerListRequest(0).then( (res: TSHotArtistsData.HotArtistsList) => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    })
   }
 }

 /**
  * 加载更多热门歌手
  * @returns 
  */

 export const refreshMoreHotSingerList  = () => {
   return (dispatch: any, getState: any) => {
     const pageCount = getState().getIn(['singers', 'pageCount'])
     const singerList = getState().getIn(['singers', 'singerList']).toJS()
     getHotSingerListRequest(pageCount).then((res: TSHotArtistsData.HotArtistsList) => {
      const data = [...singerList, ...res.artists]
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false))
     }).catch(() => {
      console.log('热门歌手数据获取失败');
     })
   }
 }
 /**
  * 第一次加载对应类型的歌手
  * @param type 类型
  * @param area 地区
  * @param alpha 首字母
  * @returns 
  */

 export const getSingerList = (type: string, area: string, alpha: string) => {
   return (dispatch: any, getState: any) => {
    getSingerListRequest({type: type, area: area, alpha: alpha, count: 0}).then((res: TSSingersList.SingerList) => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch(()=>{
      console.log('歌手数据获取失败');
    })
   }
 } 

 /**
  * 加载更多歌手
  * @param type 类型
  * @param area 地区
  * @param alpha 首字母
  * @returns 
  */
 export const refreshMoreSingerList = (type: string, area: string, alpha: string) => {
  return (dispatch: any, getState: any) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getSingerListRequest({type: type, area: area, alpha: alpha, count: pageCount}).then((res: TSSingersList.SingerList) => {
      const data = [...singerList, ...res.artists]
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false));
    }).catch(()=>{
      console.log('歌手数据获取失败');
    })
   }
 }