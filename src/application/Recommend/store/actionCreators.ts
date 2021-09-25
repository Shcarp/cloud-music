import * as actionTypes from "./constant"
import  { fromJS } from "immutable"
import { getBannerRequest, getRecommendListRequest  } from "../../../api/request"

export const changeBannerList = (data:TSRecommendData.BannerArrDataType) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data) as TSRecommendData.ArrType
})

export const changeRecommendList = (data: TSRecommendData.PersonalizedArrDataType) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS (data) as TSRecommendData.ArrType
})

export const changeEnterLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data: data
})


export const getBannerList = () => {
  return(dispatch: TSRecommendData.DispachFunc) => {
    getBannerRequest().then(data => {
      dispatch(changeBannerList(data.banners))
    }).catch(() => {
      console.log("轮播图数据传输错误")
    })
  }
}

export const getRecommendList = () => {
  return (dispatch:TSRecommendData.DispachFunc) => {
    getRecommendListRequest().then (data=>{
      dispatch(changeRecommendList(data.result))
      dispatch(changeEnterLoading(false))
    }).catch(()=>{
      console.log("推荐歌单数据传输错误")
    })
  }
}



